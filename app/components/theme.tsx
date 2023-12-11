'use client';
import { createTheme } from '@mui/material/styles';
// Define your theme outside of the component function
const theme = createTheme({
    palette: {
      primary: {
        main: '#5d4037',
      },
      secondary: {
        main: '#40302B', 
      },
      background: {
        default: '#efebe9', 
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  
  export default theme;
