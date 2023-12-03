import React from 'react';
import { Container } from '@mui/material';
import Header from './components/header';
import MenuButtons from './components/menu';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import Banner from './components/banner';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="sm" className='containerRoot'>
      <Header/>
      <Banner/>
      <MenuButtons/>
    </Container>
    </ThemeProvider>
  );
}
