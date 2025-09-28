// import 'server-only';

import { getEnvVar } from './utils';

// Centralized object to manage all environment variables for server side application
export function serverEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('Server environment variables cannot be accessed from the client');
  }

  return {
    NODE_ENV: getEnvVar("NODE_ENV"),

    RESEND_API_KEY: getEnvVar("RESEND_API_KEY"),


    RECAPTCHA_SECRET_KEY: getEnvVar("RECAPTCHA_SECRET_KEY"),

  
    GOOGLE_CLIENT_ID: getEnvVar("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: getEnvVar("GOOGLE_CLIENT_SECRET"),

    ALLOWED_DASHBOARD_EMAIL: getEnvVar("ALLOWED_DASHBOARD_EMAIL"),

    SITE_TO_CRAWL: process.env.SITE_TO_CRAWL as string | undefined,

    MONGODB_URI: process.env.MONGODB_URI as string | undefined,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME as string | undefined,

    MONGODB_COLLECTION_EMBEDDINGS: process.env.MONGODB_COLLECTION_EMBEDDINGS as string | undefined,
    MONGODB_COLLECTION_CRAWLING_META: process.env.MONGODB_COLLECTION_CRAWLING_META as string | undefined,
    MONGODB_COLLECTION_CHATS: process.env.MONGODB_COLLECTION_CHATS as string | undefined,

    MONGODB_VECTOR_INDEX_NAME: process.env.MONGODB_VECTOR_INDEX_NAME as string | undefined,
    MONGODB_VECTOR_PATH_NAME: process.env.MONGODB_VECTOR_PATH_NAME as string | undefined,
    GCP_KEY_BASE64: process.env.GCP_KEY_BASE64 as string | undefined,
    GROQ_API_KEY: process.env.GROQ_API_KEY as string | undefined,
  }
};