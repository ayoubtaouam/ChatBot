import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export const ChatInput = ({
  onSend,
  loading,
}: {
  onSend: (text: string) => void;
  loading: boolean;
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <Box display="flex" gap={1} p={2}>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about the application..."
      />
      <Button variant="contained" onClick={handleSend} disabled={loading}>
        Send
      </Button>
    </Box>
  );
};