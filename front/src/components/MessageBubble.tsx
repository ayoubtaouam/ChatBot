import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Message } from '../types/chat.types';

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        py: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 720,
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            gap: 1.5,
            maxWidth: '75%',
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
              color: '#fff',
              flexShrink: 0,
            }}
          >
            {isUser ? <PersonIcon sx={{ fontSize: 18 }} /> : 'AI'}
          </Box>

          {/* Bubble + Time */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Message Bubble */}
            <Box
              sx={{
                bgcolor: isUser ? '#1976d2' : '#f1f1f1',
                color: isUser ? '#fff' : '#1a1a1a',
                px: 2,
                py: 1.5,
                borderRadius: 2,
                minWidth: 0,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {message.content}
              </Typography>
            </Box>

            {/* Time */}
            {formattedTime && (
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  fontSize: '0.7rem',
                  color: '#6b7280',
                  textAlign: isUser ? 'right' : 'left',
                }}
              >
                {formattedTime}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};