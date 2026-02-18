import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { ChatPage } from './pages/ChatPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChatPage />
    </ThemeProvider>
  );
}

export default App;