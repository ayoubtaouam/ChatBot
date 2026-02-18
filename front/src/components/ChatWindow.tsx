import { Box } from '@mui/material';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ModelBadge } from './ModelBadge';

export const ChatWindow = () => {
  const { messages, sendMessage, loading, model } = useChat();

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box p={2}>
        <ModelBadge model={model} />
      </Box>

      <Box flex={1} overflow="auto">
        <MessageList messages={messages} />
      </Box>

      <ChatInput onSend={sendMessage} loading={loading} />
    </Box>
  );
};