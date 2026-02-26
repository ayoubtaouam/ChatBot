import { Box, keyframes } from '@mui/material';

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
`;

export const TypingIndicator = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 1.5,
      maxWidth: '75%'
    }}
  >
    <Box
      sx={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        bgcolor: '#19857b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
      }}
    >
      AI
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pt: 1 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: '#8e8ea0',
            animation: `${bounce} 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </Box>
  </Box>
);