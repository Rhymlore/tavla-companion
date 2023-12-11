'use client'
import AppShell from './homePage';
import Box from '@mui/material/Box'

export default function Home() {

  return (
    <Box 
        sx={{
          textAlign:"center", 
          '& button': { m: 2 }, 
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'stretch', 
          alignContent: 'space-between',
          height: '100vh',
          justifyContent: 'space-around'
        }}>
      <AppShell/>
    </Box>
  )
}
