import { api } from './apiClient';
import { ConversationSummary, Message } from '../types/chat.types';

export const ConversationsService = {
  async getAll(): Promise<ConversationSummary[]> {
    const res = await api.get<ConversationSummary[]>('/conversations');
    return res.data;
  },

  async getMessages(id: number): Promise<Message[]> {
    const res = await api.get<Message[]>(`/conversations/${id}/messages`);
    return res.data;
  },
};