import { AIResponse } from "@/types/chats.types";

export const processAIResponse = (aiResponse: string): AIResponse => {
  try {
    // Parse the AI response as JSON
    const parsed: AIResponse = JSON.parse(aiResponse) as AIResponse;

    // Validate and format the response as needed
    return {
      response: parsed.response,
      title: parsed.title
    };
  } catch (error) {
    console.error('Error processing AI response: ', error);

    return {
      response: 'Error processing AI response',
      title: ''
    };
  }
}