import { Box } from '@mui/material';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { WelcomeScreen } from './WelcomeScreen';
import { Message } from '../types/chat.types';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import SettingsModal from './SettingsModal';

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onSend: (text: string) => void;
}

export const ChatWindow = ({ messages, loading, onSend }: ChatWindowProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
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
          justifyContent: 'flex-end',
          px: 2,
          py: 1,
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <IconButton onClick={() => setSettingsOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </Box>

      {/* Messages or Welcome */}
      {hasMessages ? (
        <MessageList messages={messages} loading={loading} />
      ) : (
        <WelcomeScreen />
      )}

      {/* Input */}
      <ChatInput onSend={onSend} loading={loading} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Box>
  );
};