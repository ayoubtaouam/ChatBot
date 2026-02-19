import { Box } from '@mui/material';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import ModelSelector from './ModelSelector';

export const ChatWindow = () => {
  const { messages, sendMessage, loading, model } = useChat();

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        <ModelSelector />
      </Box>

      <Box flex={1} overflow="auto">
        <MessageList messages={messages} />
      </Box>

      <ChatInput onSend={sendMessage} loading={loading} />
    </Box>
  );
};