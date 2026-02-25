import { useState, KeyboardEvent } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const ChatInput = ({
  onSend,
  loading,
}: {
  onSend: (text: string) => void;
  loading: boolean;
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || loading) return;
    onSend(text);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        px: 3,
        pb: 3,
        pt: 1,
        maxWidth: 720,
        mx: 'auto',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          bgcolor: '#ffffff',
          borderRadius: 3,
          border: '1px solid #d9d9e3',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          px: 2,
          py: 0.5,
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:focus-within': {
            borderColor: '#1976d2',
            boxShadow: '0 2px 8px rgba(25,118,210,0.12)',
          },
        }}
      >
        <InputBase
          multiline
          maxRows={6}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatBot..."
          sx={{
            color: '#1a1a1a',
            py: 1.5,
            fontSize: 14,
            lineHeight: 1.5,
            '& .MuiInputBase-input::placeholder': {
              color: '#8e8ea0',
              opacity: 1,
            },
          }}
        />
        <IconButton
          onClick={handleSend}
          disabled={loading || !text.trim()}
          size="small"
          sx={{
            mb: 0.5,
            ml: 1,
            bgcolor: text.trim() && !loading ? '#1976d2' : 'transparent',
            color: text.trim() && !loading ? '#fff' : '#c5c5d2',
            width: 32,
            height: 32,
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: text.trim() && !loading ? '#1565c0' : 'transparent',
            },
            '&.Mui-disabled': {
              color: '#c5c5d2',
            },
          }}
        >
          <SendIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};