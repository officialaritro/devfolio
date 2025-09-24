# 🤖 Chatbot Documentation

## Overview

The AI chatbot is a core feature of this portfolio website, allowing visitors to interact with an AI representation of me. The chatbot can answer questions about my skills, experience, projects, and more using information from my website content.

## Architecture

The chatbot system consists of several interconnected components:

1. **Frontend Interface**: A chat UI built with React and Tailwind CSS
2. **Chat Backend**: API endpoints handling message processing and response generation
3. **Vector Database**: MongoDB with vector search capabilities
4. **AI Model**: Groq API for generating natural language responses

## How It Works

### Chat Initialization

When a user clicks on the chatbot button in the frontend:

1. A request is sent to the `/api/chat/initialize` endpoint
2. A new chat session is created in MongoDB with a unique ID
3. This ID is returned to the frontend and stored in localStorage
4. The chat interface is loaded with any existing conversation history

```typescript
// Simplified chat initialization
export async function initializeChat() {
  const response = await fetch('/api/chat/initialize', {
    method: 'POST',
  });
  
  const { chatId } = await response.json();
  localStorage.setItem('chatId', chatId);
  return chatId;
}
```

### Message Processing

When a user sends a message:

1. The message and chatId are sent to the `/api/chat` endpoint
2. The backend converts the message to embeddings using Vertex AI
3. MongoDB vector search finds relevant content from the website
4. The message, relevant content, and chat history are sent to Groq AI
5. The AI generates a response which is stored in the chat history
6. The response is returned to the frontend and displayed to the user

```typescript
// Simplified message processing flow
export async function POST(req: NextRequest) {
  const { message, chatId } = await req.json();
  
  // Initialize GCP auth
  initGCPAuth();
  
  // Generate embedding for the user's message
  const queryEmbedding = await generateEmbedding(message);
  
  // Search for relevant content
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
  
  // Get chat history
  const existingChat = await chatsCollection.findOne({ chatId });
  const chatHistory = prepareChatHistory(existingChat);
  
  // Generate AI response using Groq
  const aiResponse = await generateGroqResponse(message, results[0].content, chatHistory);
  
  // Store in database
  await appendToConversation(chatId, message, "user");
  await appendToConversation(chatId, aiResponse.response, "bot");
  
  return NextResponse.json({ chatId });
}
```

### Response Generation

The Groq AI model generates responses based on:

1. A system prompt specifying it should respond as Shivam Taneja
2. The complete chat history for context
3. Relevant content from the website related to the user's query
4. The user's latest message

The model is configured to:
- Use a lightweight model (llama-3.1-8b-instant) for speed
- Generate concise responses with appropriate tone
- Provide a title for the chat conversation
- Return valid JSON format

## Database Schema

The chatbot utilizes two main collections in MongoDB:

### Embeddings Collection

```typescript
interface EmbeddingDocument {
  url: string;         // Page URL
  title: string;       // Page title
  description: string; // Meta description
  content: string;     // Page content (markdown)
  embedding: number[]; // Vector embedding
}
```

### Chats Collection

```typescript
interface ChatDocument {
  chatId: string;      // Unique chat identifier
  title: string;       // AI-generated chat title
  conversation: {      // Array of messages
    type: 'user' | 'bot';
    message: string;
    timestamp: Date;
  }[];
  createdAt: Date;
}
```

## Optimization Techniques

The chatbot implementation uses several techniques to ensure good performance:

1. **Parallel Operations**: Running embedding generation and chat retrieval in parallel
2. **Reduced Vector Parameters**: Using optimized numCandidates and limit values
3. **Model Selection**: Using llama-3.1-8b-instant for faster responses
4. **Content Limitation**: Limiting content length for embedding to stay within rate limits

## Configuration

The chatbot requires the following environment variables:

```env
MONGODB_URI=""
MONGODB_DB_NAME=""
MONGODB_COLLECTION_EMBEDDINGS=""
MONGODB_COLLECTION_CHATS=""
MONGODB_VECTOR_INDEX_NAME=""
MONGODB_VECTOR_PATH_NAME=""
GCP_KEY_BASE64=""
GROQ_API_KEY=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
```

## Future Improvements

Planned improvements for the chatbot include:

1. Implementing response streaming for better UX
2. Adding feedback mechanism to improve responses
3. Implementing caching for common questions
4. Adding typing indicators and read receipts