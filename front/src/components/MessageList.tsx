import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { Message } from '../types/chat.types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
}

export const MessageList = ({ messages, loading }: MessageListProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
      }}
    >
      {messages.map((m, i) => (
        <MessageBubble key={i} message={m} />
      ))}
      {loading && <TypingIndicator />}
      <div ref={endRef} />
    </Box>
  );
};