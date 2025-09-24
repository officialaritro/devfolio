// import 'server-only';

import { getEnvVar } from './utils';

// Centralized object to manage all environment variables for server side application
export function serverEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('Server environment variables cannot be accessed from the client');
  }

  return {
    // Environment (e.g., 'development', 'production')
    NODE_ENV: getEnvVar("NODE_ENV"),

    // API key for the Resend service 
    RESEND_API_KEY: getEnvVar("RESEND_API_KEY"),

    // Google reCAPTCHA keys for server-side validation
    RECAPTCHA_SECRET_KEY: getEnvVar("RECAPTCHA_SECRET_KEY"),

    // Google OAuth client credentials for authentication
    GOOGLE_CLIENT_ID: getEnvVar("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: getEnvVar("GOOGLE_CLIENT_SECRET"),

    // Email allowed to access the dashboard 
    ALLOWED_DASHBOARD_EMAIL: getEnvVar("ALLOWED_DASHBOARD_EMAIL"),

    // URL of the site to crawl
    SITE_TO_CRAWL: getEnvVar("SITE_TO_CRAWL"),

    // MongoDB connection string (URI) for connecting to the database
    MONGODB_URI: getEnvVar("MONGODB_URI"),

    // MongoDB database name to use
    MONGODB_DB_NAME: getEnvVar("MONGODB_DB_NAME"),

    // Collection names within MongoDB
    MONGODB_COLLECTION_EMBEDDINGS: getEnvVar("MONGODB_COLLECTION_EMBEDDINGS"),
    MONGODB_COLLECTION_CRAWLING_META: getEnvVar("MONGODB_COLLECTION_CRAWLING_META"),
    MONGODB_COLLECTION_CHATS: getEnvVar("MONGODB_COLLECTION_CHATS"),

    // MongoDB vector search configuration settings
    MONGODB_VECTOR_INDEX_NAME: getEnvVar("MONGODB_VECTOR_INDEX_NAME"),
    MONGODB_VECTOR_PATH_NAME: getEnvVar("MONGODB_VECTOR_PATH_NAME"),

    // Base64-encoded Google Cloud Platform credentials for accessing GCP services
    GCP_KEY_BASE64: getEnvVar("GCP_KEY_BASE64"),

    // API key for accessing the GROQ API
    GROQ_API_KEY: getEnvVar("GROQ_API_KEY"),
  }
};
