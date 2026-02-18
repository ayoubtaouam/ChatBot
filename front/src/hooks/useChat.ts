import { useState } from 'react';
import { Message } from '../types/chat.types';
import { ChatService } from '../services/chat.service';

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
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading, model };
};