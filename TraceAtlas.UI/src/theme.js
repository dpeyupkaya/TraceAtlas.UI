// TraceAtlas UI – Global theme definition
// Dark‑forest background with emerald accents – the visual identity of the project.

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#041a14', // deep forest background used across pages
      paper: '#0a291e',   // slightly lighter for cards / dialogs
    },
    primary: {
      main: '#00c853', // emerald accent – used for buttons, spinners, highlights
    },
    secondary: {
      main: '#80cbc4', // complementary teal for secondary actions
    },
    text: {
      primary: '#e0f2f1', // light cyan text for readability on dark background
      secondary: '#a7ffeb',
    },
  },
  typography: {
    // Keep the existing font family (e.g., "Roboto", "Helvetica", "Arial")
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    // Example sizes that match the current design language
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
  },
  components: {
    // Apply glass‑morphic style to containers that need a subtle blur
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(4, 26, 20, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,200,83,0.2)',
        },
      },
    },
    // Global button style with emerald hover
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#00c853',
          '&:hover': { backgroundColor: '#00b040' },
        },
      },
    },
  },
});

export default theme;
