import React from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box'

export default function Footer() {
  return (
    <Box 
        sx={{
            width: '100%', 
            height: '50px', // Fixed height for the footer (adjust as needed)
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            flexDirection: 'row'
        }}
    >
    <AppBar position="sticky" style={{ top: 'auto', bottom: 0 }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <IconButton edge="start" color="inherit" aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="home">
          <HomeIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="refresh">
          <RefreshIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    </Box>
  );
}
