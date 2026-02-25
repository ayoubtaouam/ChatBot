import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Message } from '../types/chat.types';

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        maxWidth: 720,
        mx: 'auto',
        px: 3,
        py: 2,
        ...(isUser
          ? {}
          : { bgcolor: '#f7f7f8' }),
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          bgcolor: isUser ? '#1976d2' : '#19857b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          color: '#fff',
          flexShrink: 0,
        }}
      >
        {isUser ? <PersonIcon sx={{ fontSize: 18 }} /> : 'AI'}
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: '#1a1a1a',
            mb: 0.5,
            display: 'block',
          }}
        >
          {isUser ? 'You' : 'Assistant'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#374151',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};