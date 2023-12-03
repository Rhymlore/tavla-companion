'use client';
import { createTheme } from '@mui/material/styles';
// Define your theme outside of the component function
const theme = createTheme({
    palette: {
      primary: {
        main: '#D6A99A', // Replace with your primary color
      },
      secondary: {
        main: '#40302B', // Replace with your secondary color
      },
      background: {
        default: '#F5F5F5', // Replace with your desired background color
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
