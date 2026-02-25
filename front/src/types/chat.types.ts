export interface Message {
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
}

export interface ChatResponse {
  conversationId: number;
  message: string;
  model: string;
  assistantCreatedAt?: string;
}

export interface ConversationSummary {
  id: number;
  title: string;
  createdAt: string;
}