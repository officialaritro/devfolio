import { NextRequest, NextResponse } from "next/server";

import Groq from 'groq-sdk';

import { getServerSession } from "next-auth";

import { initGCPAuth } from "@/lib/auth/gcp-auth";
import { authOptions } from "@/lib/auth/next-auth";
import { processAIResponse } from "@/lib/chat";
import { generateEmbedding } from "@/lib/embedding";
import { serverEnv } from "@/lib/env/server";
import {
  appendToConversation,
  getChatsCollection,
  getDbClient,
  getEmbeddingsCollection
} from "@/lib/mongo";

import { chatSchema } from "@/schema/chat";

import { ChatDocument } from "@/types/chats.types";

const groq = new Groq({ apiKey: serverEnv().GROQ_API_KEY })

export async function GET() {
  if (serverEnv().NODE_ENV !== 'development') {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.email !== serverEnv().ALLOWED_DASHBOARD_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const chatsCollection = await getChatsCollection()

    const chats = await chatsCollection.find().project({ chatId: 1, title: 1, createdAt: 1 }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Failed to get chats: ", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  initGCPAuth();

  const client = await getDbClient()
  const session = client.startSession();
  const chatsCollection = await getChatsCollection();

  try {
    // Parse and validate incoming request
    const { error, data } = chatSchema.safeParse(await req.json());
    if (error) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const { message, chatId } = data

    await session.withTransaction(async () => {
      const [queryEmbedding, existingChat] = await Promise.all([
        generateEmbedding(message),
        chatsCollection.findOne({ chatId })
      ]);

      // Prepare chat history if it exists
      const chatHistory = prepareHistoryForAI(existingChat);

      // Search for relevant content using vector search
      const relevantContent = await findRelevantContent(queryEmbedding);

      if (!relevantContent) {
        await appendToConversation(chatId, "Hey! How can I assist?", null, "bot", session);
        await appendToConversation(chatId, message, null, "user", session)
        await appendToConversation(chatId, "I don't have enough information to answer that question. Feel free to ask me something else about me!", "No Information Available", 'bot', session)

        return NextResponse.json({ chatId });
      }

      const answer = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant', // Best lightweight model for speed
        messages: [
          {
            role: 'system',
            content: `
             You are an AI assistant that represents me (Aritro Roy) on my personal website. Your purpose is to answer questions and engage with visitors as if you were me, based on the content from my website. Be natural, friendly, and helpful.
             If you don't know something or if the information isn't in the provided context, simply say you don't have that information yet. Don't make up facts about me or my work. Keep responses concise but informative.
             When discussing technical topics, convey my expertise and passion for technology. If asked about personal preferences or opinions, base your responses on the context provided from my website.
             `
          },
          ...chatHistory,
          {
            role: 'user',
            content: `
             Here is information from my website that might help answer the user's question:
             
             Context: ${relevantContent}
             User question: ${message}
             
             Please respond in a conversational manner as if you are me (Aritro Roy).
             
             Additionally, generate a **short 5-word title** (maximum of 5 words) that summarizes the main topic of this conversation. The title should be concise and accurately reflect the content of the conversation.
             
             Please separate the title from the response. For example:
             title: [Generated Title]. Make sure this is a string.
             response: [Generated response]. Make sure this is a string.
 
             Ensure your response is **valid JSON**. No extra explanations—only return the JSON object.
             `
          },
        ],
        frequency_penalty: 0.5, // Reduces repetition
        presence_penalty: 0.5, // Encourages diverse outputs
        temperature: 0.7,
        max_tokens: 400,
        response_format: { type: 'json_object' }
      })

      const { response, title } = processAIResponse(answer.choices[0].message.content?.trim() || '{}');

      if (!existingChat?.title) {
        // Set title only if not set already
        await chatsCollection.updateOne(
          { chatId },
          { $set: { title } },
          { session }
        );
      }

      await appendToConversation(chatId, message, null, "user", session)
      await appendToConversation(chatId, response, null, 'bot', session)
    })

    return NextResponse.json({ chatId });
  } catch (error) {
    console.error("Chat error: ", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

/**
 * Finds relevant content by performing vector search
 * @param queryEmbedding The embedding of the user's query
 * @returns The most relevant content or null if none found
 */
async function findRelevantContent(queryEmbedding: number[]): Promise<string | null> {
  const embeddingsCollection = await getEmbeddingsCollection()

  const results = await embeddingsCollection.aggregate([
    {
      $vectorSearch: {
        index: serverEnv().MONGODB_VECTOR_INDEX_NAME,
        path: serverEnv().MONGODB_VECTOR_PATH_NAME,
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 5,
        similarity: "cosine",
      }
    }
  ]).toArray();

  if (!results || results.length === 0) {
    return null
  }

  return results[0].content;
}

/**
 * Prepares chat history for AI input
 * @param existingChat The existing chat document from the database
 * @returns Array of messages formatted for the AI
 */
function prepareHistoryForAI(existingChat: ChatDocument | null) {
  const chatHistory: { role: 'user' | 'assistant', content: string }[] = [];

  if (existingChat) {
    for (const msg of existingChat.conversation) {
      chatHistory.push({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.message,
      });
    }
  }

  return chatHistory;
}