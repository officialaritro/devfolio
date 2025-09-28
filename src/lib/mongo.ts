import { MongoClient, Db, Collection } from "mongodb";
import { serverEnv } from "@/lib/env/server";

declare global {
  // eslint-disable-next-line no-var
  var _mongo: {
    client?: MongoClient;
    db?: Db;
    promise?: Promise<MongoClient>;
  } | undefined;
}

const mongo = global._mongo || {};
if (!global._mongo) {
  global._mongo = mongo;
}

function getMongoConfig() {
  const env = serverEnv();
  return {
    uri: env.MONGODB_URI,
    dbName: env.MONGODB_DB_NAME,
  };
}

export async function connectToDatabase(): Promise<Db | null> {
  const { uri, dbName } = getMongoConfig();

  if (!uri) {
    console.warn("No MONGODB_URI provided - skipping DB connection.");
    return null;
  }

  if (mongo.client) return mongo.db || null;

  if (!mongo.promise) {
    const client = new MongoClient(uri);
    mongo.promise = client.connect();
  }

  try {
    const client = await mongo.promise;
    mongo.client = client;
    mongo.db = client.db(dbName);
    return mongo.db;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    mongo.promise = undefined;
    return null;
  }
}

export async function closeDatabase() {
  if (mongo.client) {
    await mongo.client.close();
    mongo.client = undefined;
    mongo.db = undefined;
    mongo.promise = undefined;
  }
}

// ====== DISABLED CHAT FUNCTIONS ======
// These functions are temporarily disabled but kept for future use

/**
 * Get MongoDB client - DISABLED
 * Returns null to disable chat functionality
 */
export async function getDbClient(): Promise<MongoClient | null> {
  console.warn("Chat functionality is disabled - getDbClient returning null");
  return null;
}

/**
 * Get chats collection - DISABLED
 * Throws error to prevent usage
 */
export async function getChatsCollection(): Promise<Collection> {
  throw new Error("Chat functionality is currently disabled. Enable MongoDB connection to use this feature.");
}

/**
 * Get embeddings collection - DISABLED
 * Throws error to prevent usage
 */
export async function getEmbeddingsCollection(): Promise<Collection> {
  throw new Error("Embeddings functionality is currently disabled. Enable MongoDB connection to use this feature.");
}

/**
 * Get crawling metadata collection - DISABLED  
 * Throws error to prevent usage
 */
export async function getCrawlingMetaDataCollection(): Promise<Collection> {
  throw new Error("Crawling functionality is currently disabled. Enable MongoDB connection to use this feature.");
}

/**
 * Append message to conversation - DISABLED
 * Throws error to prevent usage
 */
export async function appendToConversation(): Promise<void> {
  throw new Error("Chat functionality is currently disabled. Enable MongoDB connection to use this feature.");
}

// ====== FUTURE ENABLEMENT GUIDE ======
/*
To enable chat functionality in the future:

1. Set up MongoDB connection string in environment variables
2. Replace the disabled functions above with actual implementations:

export async function getDbClient(): Promise<MongoClient> {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  return client;
}

export async function getChatsCollection(): Promise<Collection> {
  const db = await connectToDatabase();
  if (!db) throw new Error("Database connection failed");
  return db.collection('chats');
}

export async function getEmbeddingsCollection(): Promise<Collection> {
  const db = await connectToDatabase();
  if (!db) throw new Error("Database connection failed");
  return db.collection('embeddings');
}

export async function getCrawlingMetaDataCollection(): Promise<Collection> {
  const db = await connectToDatabase();
  if (!db) throw new Error("Database connection failed");
  return db.collection('crawling_metadata');
}

export async function appendToConversation(
  chatId: string,
  message: string,
  userId: string | null,
  role: "user" | "bot"
): Promise<void> {
  const collection = await getChatsCollection();
  await collection.updateOne(
    { chatId },
    {
      $push: {
        messages: {
          id: new ObjectId().toString(),
          message,
          userId,
          role,
          timestamp: new Date()
        }
      }
    },
    { upsert: true }
  );
}

3. Uncomment the ChatBot component in wrapper.tsx
4. Test all functionality
*/