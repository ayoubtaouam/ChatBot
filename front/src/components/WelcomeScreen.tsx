import { Box, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export const WelcomeScreen = () => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      opacity: 0.7,
    }}
  >
    <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: '#c5c5d2' }} />
    <Typography variant="h5" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
      How can I help you today?
    </Typography>
    <Typography variant="body2" sx={{ color: '#6b6c7b', maxWidth: 400, textAlign: 'center' }}>
      Ask me anything about the application. I'll use the knowledge base to provide accurate answers.
    </Typography>
  </Box>
);