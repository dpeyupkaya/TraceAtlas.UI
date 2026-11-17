import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled full-screen container with TraceAtlas dark‑forest theme
const Overlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  backgroundColor: '#041a14', // dark forest background
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1300, // above most UI elements
  color: '#00c853', // emerald accent for text
}));

/**
 * Waiting component – a lightweight full‑screen loading overlay.
 *
 * Props:
 *   message   – optional status text displayed below the spinner.
 *   isVisible – boolean to toggle visibility (defaults to true).
 */
const Waiting = ({ message = 'Loading…', isVisible = true }) => {
  if (!isVisible) return null;
  return (
    <Overlay>
      <CircularProgress
        size={80}
        thickness={4}
        sx={{ color: '#00c853' }} // emerald spinner colour
      />
      {message && (
        <Typography variant="h6" sx={{ mt: 2, fontFamily: 'inherit' }}>
          {message}
        </Typography>
      )}
    </Overlay>
  );
};

export default Waiting;
