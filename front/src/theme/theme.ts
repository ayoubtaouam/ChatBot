import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    background: {
      default: '#ffffff',
      paper: '#f7f7f8',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b6c7b',
    },
    divider: 'rgba(0,0,0,0.08)',
  },
  typography: {
    fontFamily:
      "'Söhne', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    fontSize: 14,
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          backgroundColor: '#ffffff',
          scrollbarWidth: 'thin',
          scrollbarColor: '#c5c5d2 transparent',
        },
        '*::-webkit-scrollbar': { width: 6 },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#c5c5d2',
          borderRadius: 3,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});