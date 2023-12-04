import React from 'react';
import { Container } from '@mui/material';
import Header from './components/header';
import MenuButtons from './components/menu';
import Banner from './components/banner';

export default function Home() {
  return (
    <Container maxWidth="sm" className='containerRoot'>
      <Header/>
      <Banner img="/images/header.png" />
      <MenuButtons/>
    </Container>
  );
}
