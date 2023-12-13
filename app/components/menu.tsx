'use client';

import * as React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Link from 'next/link';
import localforage from 'localforage';


export default function MenuButtons() {

  async function clearLocalForage() {
    try {
      const keysToKeep = ['players', 'email'];
      const allKeys = await localforage.keys();
  
      for (const key of allKeys) {
        if (!keysToKeep.includes(key)) {
          await localforage.removeItem(key);
        }
      }
  
      console.log('Game results has been cleared');
    } catch (err) {
      console.error('Error during selective clearing:', err);
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Link href={'/newgame'} style={{ color: 'inherit' }}>
        <Button variant="contained" color="primary" onClick={() => clearLocalForage()} fullWidth>
            <CasinoIcon/>
            <Typography variant="h6"> New Game</Typography>
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
