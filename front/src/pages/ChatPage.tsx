import { Container, Paper } from '@mui/material';
import { ChatWindow } from '../components/ChatWindow';

export const ChatPage = () => (
  <Container maxWidth="md" sx={{ mt: 4 }}>
    <Paper sx={{ height: '80vh' }}>
      <ChatWindow />
    </Paper>
  </Container>
);