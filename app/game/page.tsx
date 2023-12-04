'use client'
import React from 'react';
import { Grid, Button, Typography, Paper, Container, Box } from '@mui/material';
import SectionHeader from '../components/sectionHeader';
import { styled } from '@mui/material/styles';

const FlippedBox = styled(Box)({
  transform: 'rotate(180deg)',
  textAlign: 'center',
});

const GameButton = styled(Button)({
  margin: '10px 0',
});
const GamePage: React.FC = () => {
  return (
    <Container maxWidth="sm" className='containerRoot'>
    <SectionHeader name="New Game"> </SectionHeader>
    <Grid container direction="column" justifyContent="space-between" style={{ height: '100vh' }}>
      <FlippedBox sx={{ flexGrow: 1 }}>
        {/* Player 1's controls, rotated 180 degrees to face 'up' */}
        <Typography variant="h4" gutterBottom>Player 1</Typography>
        <Grid container direction="row" justifyContent="center" gap={2}>
        <GameButton variant="contained">Roll</GameButton>
        <GameButton variant="contained">Double</GameButton>
        </Grid>
        <Grid container direction="column" gap={2}>
        <GameButton variant="contained">Hit</GameButton>
        <GameButton variant="contained">No Play</GameButton>
        </Grid>
        <Typography>01:33 | Pause</Typography>
      </FlippedBox>
      
      {/* Divider could be added here if needed */}
      
      <Box sx={{ flexGrow: 1 }}>
        {/* Player 2's controls, oriented normally to face 'down' */}
        <Typography variant="h4" gutterBottom>Player 2</Typography>
        <Grid container direction="row" justifyContent="center" gap={2}>
        <GameButton variant="contained">Roll</GameButton>
        <GameButton variant="contained">Double</GameButton>
        </Grid>
        <Grid container direction="column" gap={2}>
        <GameButton variant="contained">Hit</GameButton>
        <GameButton variant="contained">No Play</GameButton>
        </Grid>
        <Typography>01:33 | Pause</Typography>
      </Box>
    </Grid>
    </Container>
  );
};

export default GamePage;
