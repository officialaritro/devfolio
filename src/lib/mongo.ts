import { MongoClient, Db } from "mongodb";
import { serverEnv } from "@/lib/env/server";

declare global {
  // allow global `mongo` in dev mode
  var mongo: {
    client?: MongoClient;
    db?: Db;
    promise?: Promise<MongoClient>;
  } | undefined;
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
    console.warn(
      "No MONGODB_URI provided - skipping DB connection (feature disabled)"
    );
    return null;
  }

  if (!global.mongo) {
    global.mongo = {};
  }

  // reuse existing client if available
  if (global.mongo.client) {
    return global.mongo.db || null;
  }

  // initialize clientPromise once
  if (!global.mongo.promise) {
    const client = new MongoClient(uri);
    global.mongo.promise = client.connect();
  }

  try {
    const client = await global.mongo.promise;
    global.mongo.client = client;
    global.mongo.db = client.db(dbName);
    return global.mongo.db;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    global.mongo.promise = undefined; // reset on failure
    return null;
  }
}

export async function closeDatabase() {
  if (global.mongo?.client) {
    await global.mongo.client.close();
    global.mongo.client = undefined;
    global.mongo.db = undefined;
    global.mongo.promise = undefined;
  }
}
