import { ClientSession, MongoClient, UpdateFilter } from "mongodb";

import { ChatDocument, ConversationMessage } from "@/types/chats.types";
import { CrawlingMetaData } from "@/types/crawl.types";

import { serverEnv } from "./env/server";

let client: MongoClient | null = null
let db: ReturnType<MongoClient["db"]> | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(serverEnv().MONGODB_URI);
    await client.connect();
    db = client.db(serverEnv().MONGODB_DB_NAME);
  }

  return db!;
}

async function getDbClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(serverEnv().MONGODB_URI);
    await client.connect();
    db = client.db(serverEnv().MONGODB_DB_NAME);
  }

  return client;
}

async function getChatsCollection() {
  const db = await connectToDatabase();
  return db.collection<ChatDocument>(serverEnv().MONGODB_COLLECTION_CHATS);
}

async function getEmbeddingsCollection() {
  const db = await connectToDatabase();
  return db.collection(serverEnv().MONGODB_COLLECTION_EMBEDDINGS);
}

async function getCrawlingMetaDataCollection() {
  const db = await connectToDatabase();
  return db.collection<CrawlingMetaData>(serverEnv().MONGODB_COLLECTION_CRAWLING_META);
}

async function appendToConversation(
  sessionId: string,
  message: string,
  title: string | null,
  type: 'bot' | 'user',
  mongoSession?: ClientSession
) {
  const chatsCollection = await getChatsCollection();

  const newMessage: ConversationMessage = {
    message,
    type,
    createdAt: new Date().toString(),
  };

  const setOnInsert: Partial<ChatDocument> = {
    createdAt: new Date().toString(),
  };

  if (title !== null) {
    setOnInsert.title = title;
  }

  const update: UpdateFilter<ChatDocument> = {
    $setOnInsert: setOnInsert,
    $push: {
      conversation: newMessage,
    },
  };

  await chatsCollection.updateOne(
    { chatId: sessionId },
    update,
    { upsert: true, session: mongoSession }
  );
}

export {
  appendToConversation,
  connectToDatabase, getChatsCollection,
  getCrawlingMetaDataCollection, getDbClient, getEmbeddingsCollection
};
