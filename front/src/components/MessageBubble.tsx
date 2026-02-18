import { Paper, Typography } from '@mui/material';
import { Message } from '../types/chat.types';

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <Paper
      sx={{
        p: 1.5,
        mb: 1,
        maxWidth: '70%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        bgcolor: isUser ? 'primary.main' : 'grey.200',
        color: isUser ? 'white' : 'black',
      }}
    >
      <Typography>{message.content}</Typography>
    </Paper>
  );
};