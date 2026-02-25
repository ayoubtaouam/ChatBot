import { Box } from '@mui/material';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { WelcomeScreen } from './WelcomeScreen';
import ModelSelector from './ModelSelector';
import { Message } from '../types/chat.types';

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onSend: (text: string) => void;
}

export const ChatWindow = ({ messages, loading, onSend }: ChatWindowProps) => {
  const hasMessages = messages.length > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#ffffff',
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <ModelSelector />
      </Box>

      {/* Messages or Welcome */}
      {hasMessages ? (
        <MessageList messages={messages} loading={loading} />
      ) : (
        <WelcomeScreen />
      )}

      {/* Input */}
      <ChatInput onSend={onSend} loading={loading} />
    </Box>
  );
};