import { VertexAIEmbeddings } from "@langchain/google-vertexai";

const model = new VertexAIEmbeddings({
  model: "text-embedding-004"
});

// Helper: Generate embedding for given text
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    // Trim and clean text to avoid unnecessary processing of whitespace
    const cleanedText = text.trim();

    // Skip empty content
    if (!cleanedText) {
      return [];
    }

    // Implement text chunking for long content to stay within rate limits
    if (cleanedText.length > 10000) {
      // For very long text, use the first portion which typically contains the most relevant info
      text = cleanedText.slice(0, 10000);
    }

    // Make the embedding request
    const embeddingResponse = await model.embedQuery(text);

    return embeddingResponse
  } catch (error) {
    console.error('Error generating embedding: ', error);
    throw error;
  }
}