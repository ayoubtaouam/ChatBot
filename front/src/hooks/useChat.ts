import { useState, useCallback } from 'react';
import { Message } from '../types/chat.types';
import { ChatService } from '../services/chat.service';
import { ConversationsService } from '../services/conversations.service';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [model, setModel] = useState<string>('unknown');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    setLoading(true);

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await ChatService.sendMessage(conversationId, text);

      setConversationId(res.conversationId);
      setModel(res.model);

      const assistantMessage: Message = {
        role: 'assistant',
        content: res.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      return res.conversationId;
    } catch (err) {
      console.error('Failed to send message:', err);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I could not reach the server. Please check that the backend is running.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const msgs = await ConversationsService.getMessages(id);
      setMessages(msgs);
      setConversationId(id);
    } catch (err) {
      console.error('Failed to load conversation:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const newChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setModel('unknown');
  }, []);

  return { messages, sendMessage, loading, model, conversationId, loadConversation, newChat };
};