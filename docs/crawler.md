# 🕸️ Content Crawler Documentation

## Overview

The content crawler is a critical component that processes website content and transforms it into vector embeddings used by the chatbot. It autonomously crawls the website's sitemap, extracts content, and stores both the content and its vector representation in MongoDB.

## Architecture

The crawler consists of the following components:

1. **API Endpoint**: `/api/crawl` GET endpoint that triggers the crawling process
2. **Sitemap Parser**: Extracts URLs from the website's sitemap.xml
3. **Content Extractor**: Uses Cheerio to parse HTML and extract meaningful content
4. **Markdown Converter**: Transforms HTML content to clean markdown text
5. **Embedding Generator**: Uses Vertex AI to generate vector embeddings
6. **Database Storage**: Stores content and embeddings in MongoDB

## Implementation Details

### Crawling Process

The crawler follows these steps:

1. Initialize GCP authentication for Vertex AI access
2. Fetch and parse the sitemap from the URL specified in environment variables
3. For each URL in the sitemap:
   - Fetch the HTML content
   - Parse the HTML using Cheerio
   - Remove unnecessary elements (scripts, styles, navigation, etc.)
   - Extract the main content
   - Convert the content to markdown
   - Clean and normalize the markdown text
   - Generate vector embeddings using Vertex AI
   - Store the content and embeddings in MongoDB
4. Update the crawling metadata with the latest timestamp

You can see the implementation in this [file](/src/app/api/crawl/route.ts).

### Embedding Generation

The crawler uses Vertex AI's text embedding model to generate vector representations of content:

```typescript
import { VertexAIEmbeddings } from "@langchain/google-vertexai";

const model = new VertexAIEmbeddings({
  model: "text-embedding-004"
});

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const cleanedText = text.trim();

    if (!cleanedText) {
      return [];
    }

    // Handle long content
    if (cleanedText.length > 10000) {
      text = cleanedText.slice(0, 10000);
    }

    const embeddingResponse = await model.embedQuery(text);
    return embeddingResponse;
  } catch (error) {
    console.error('Error generating embedding: ', error);
    throw error;
  }
}
```

## Database Schema

The crawler uses two collections in MongoDB:

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

### Crawling Metadata Collection

```typescript
interface CrawlingMetadata {
  lastCrawledAt: Date; // Timestamp of last successful crawl
}
```

## Authentication and Security

The crawler endpoint is protected using Next.js middleware that validates the request is from an authorized user. Only authenticated users with specific email addresses defined in the environment variables can trigger the crawling process.

## Configuration

The crawler requires the following environment variables:

```env
SITE_TO_CRAWL=https://www.shivamtaneja.com/sitemap.xml
MONGODB_URI=""
MONGODB_DB_NAME=""
MONGODB_COLLECTION_EMBEDDINGS=""
MONGODB_COLLECTION_CRAWLING_META=""
MONGODB_VECTOR_INDEX_NAME=""
MONGODB_VECTOR_PATH_NAME=""
GCP_KEY_BASE64=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
```

## Best Practices and Optimizations

The crawler implementation follows several best practices:

1. **Transaction-based Processing**: Uses MongoDB transactions to ensure data consistency
2. **Content Cleaning**: Removes irrelevant HTML elements to focus on meaningful content
3. **Text Truncation**: Limits content length to optimize embedding performance
4. **Error Handling**: Implements proper error handling and logging
5. **Metadata Tracking**: Records crawling timestamps for monitoring

## Manual Triggering

The crawler can be manually triggered by an authorized user through the admin dashboard or by making a direct GET request to the `/api/crawl` endpoint with proper authentication.