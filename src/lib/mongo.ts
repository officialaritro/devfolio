import { MongoClient, Db, Collection } from "mongodb";
import { serverEnv } from "@/lib/env/server";
import { ObjectId } from "mongodb";
declare global {
  interface Global {
    _mongo?: {
      client?: MongoClient;
      db?: Db;
      promise?: Promise<MongoClient>;
    };
  }
}

const globalForMongo = global as unknown as { _mongo?: Global["_mongo"] };

if (!globalForMongo._mongo) {
  globalForMongo._mongo = {};
}

const mongo = globalForMongo._mongo;

// Core Connection
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
    console.warn(
      "No MONGODB_URI provided - skipping DB connection (feature disabled)"
    );
    return null;
  }

  if (mongo.client) {
    return mongo.db || null;
  }

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

//Helper Exports for Routes
export async function getDbClient() {
  return connectToDatabase();
}

export async function getChatsCollection(): Promise<Collection | null> {
  const db = await connectToDatabase();
  return db?.collection("chats") || null;
}

export async function getEmbeddingsCollection(): Promise<Collection | null> {
  const db = await connectToDatabase();
  return db?.collection("embeddings") || null;
}

export async function getCrawlingMetaDataCollection(): Promise<
  Collection | null
> {
  const db = await connectToDatabase();
  return db?.collection("crawling_metadata") || null;
}

export async function appendToConversation(
  chatId: string,
  message: any
) {
  const collection = await getChatsCollection();
  if (!collection) return null;

  return collection.updateOne(
    { _id: new ObjectId(chatId) },
    { $push: { messages: message } }
  );
}
