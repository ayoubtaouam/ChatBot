import { Box } from '@mui/material';
import { Message } from '../types/chat.types';
import { MessageBubble } from './MessageBubble';

export const MessageList = ({ messages }: { messages: Message[] }) => (
  <Box display="flex" flexDirection="column" p={2}>
    {messages.map((m, i) => (
      <MessageBubble key={i} message={m} />
    ))}
  </Box>
);