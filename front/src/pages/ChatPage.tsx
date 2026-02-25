import { useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { ChatWindow } from '../components/ChatWindow';
import { Sidebar } from '../components/Sidebar';
import { useChat } from '../hooks/useChat';
import { useConversations } from '../hooks/useConversations';

export const ChatPage = () => {
  const {
    messages,
    sendMessage,
    loading,
    conversationId,
    loadConversation,
    newChat,
  } = useChat();

  const { conversations, load: loadConversations, loadingList } = useConversations();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const handleSelect = useCallback(
    (id: number) => {
      if (id !== conversationId) {
        loadConversation(id);
      }
    },
    [conversationId, loadConversation]
  );

  const handleNewChat = useCallback(() => {
    newChat();
  }, [newChat]);

  const handleSend = useCallback(
    async (text: string) => {
      const newConvId = await sendMessage(text);
      // Refresh sidebar after a new conversation may have been created
      if (newConvId) {
        loadConversations();
      }
    },
    [sendMessage, loadConversations]
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar
        conversations={conversations}
        activeId={conversationId}
        loading={loadingList}
        onSelect={handleSelect}
        onNewChat={handleNewChat}
      />
      <Box sx={{ flex: 1, height: '100%', overflow: 'hidden' }}>
        <ChatWindow
          messages={messages}
          loading={loading}
          onSend={handleSend}
        />
      </Box>
    </Box>
  );
};