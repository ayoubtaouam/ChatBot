import { useState, useCallback } from 'react';
import { ConversationSummary } from '../types/chat.types';
import { ConversationsService } from '../services/conversations.service';

export const useConversations = () => {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  const load = useCallback(async () => {
    setLoadingList(true);
    try {
      const data = await ConversationsService.getAll();
      setConversations(data);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    } finally {
      setLoadingList(false);
    }
  }, []);

  return { conversations, load, loadingList };
};