export interface ConversationMessage {
  message: string;
  type: 'bot' | 'user';
  createdAt: string;
}

export interface Chat {
  chatId: string;
  title?: string;
  createdAt: string;
}

export interface ChatDocument extends Chat {
  conversation: ConversationMessage[];
}

export interface AIResponse {
  title: string,
  response: string
}

