// Example component file: components/MenuButtons.tsx
import * as React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Link from 'next/link';

export default function MenuButtons() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Link href={'/newgame'} style={{ color: 'inherit' }}>
        <Button variant="contained" color="primary" fullWidth>
            <CasinoIcon/>
            <Typography variant="h6"> New Game</Typography>
        </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
      <Link href={'/players'} style={{ color: 'inherit' }}>
        <Button variant="contained" color="primary" fullWidth>
            <PeopleAltIcon/>   
            <Typography variant="h6"> Players</Typography>  
        </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Link href={'/leaderboard'} style={{ color: 'inherit' }}>
        <Button variant="contained" color="primary" fullWidth>
            <LeaderboardIcon/>
            <Typography variant="h6"> Leaderboard</Typography>
        </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
