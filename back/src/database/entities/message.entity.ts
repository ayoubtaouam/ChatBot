export interface MessageEntity {
  id: number;
  conversation_id: number;
  role: 'user' | 'assistant';
  content: string;
}