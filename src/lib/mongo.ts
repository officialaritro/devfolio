import { MongoClient, Db } from "mongodb";
import { serverEnv } from "@/lib/env/server";

declare global {
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
