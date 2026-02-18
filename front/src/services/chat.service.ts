import { api } from './apiClient';
import { ChatResponse } from '../types/chat.types';

export const ChatService = {
  async sendMessage(conversationId: number | null, message: string) {
    const res = await api.post<ChatResponse>('/chat', {
      conversationId,
      message,
    });
    return res.data;
  },
};