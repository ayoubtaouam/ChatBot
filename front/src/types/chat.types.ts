export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  conversationId: number;
  message: string;
  model: string;
}

export interface ConversationSummary {
  id: number;
  title: string;
  createdAt: string;
}