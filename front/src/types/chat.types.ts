export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  conversationId: number;
  message: string;
  model: string;
}