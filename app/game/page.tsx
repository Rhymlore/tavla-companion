'use client'
import React, {useEffect, useState} from 'react';
import { Grid, Button, Typography, Container, Box} from '@mui/material';
import SectionHeader from '../components/sectionHeader';
import localforage from 'localforage';
import { PlayerStats, Player, GameTime } from '../types/types';
import GameResults from '../components/gameResults';
import { Play } from 'next/font/google';

const initialPlayerStats: PlayerStats = {
  turn: 0,
  hit: 0,
  double: 0,
  noPlay: 0
};

const GamePage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerOneStats, setPlayerOneStats] = useState<PlayerStats>(initialPlayerStats);
  const [playerTwoStats, setPlayerTwoStats] = useState<PlayerStats>(initialPlayerStats);
  const [gameTime, setGameTime] = useState<GameTime>({ start: '', end: '' });

  const increasePlayerOneStat = (stat: keyof PlayerStats) => {
    setPlayerOneStats(prevState => {
      const newState = { ...prevState };
      newState[stat] += 1;
      localforage.setItem('playerOneStats', newState);
      return newState;
    });
  }

  const increasePlayerTwoStat = (stat: keyof PlayerStats) => {
    setPlayerTwoStats(prevState => {
      const newState = { ...prevState };
      newState[stat] += 1;
      localforage.setItem('playerTwoStats', newState);
      return newState;
    });  
  };

  const loadSelectedPlayers = async () => {
    return await localforage.getItem<Player[]>('selectedPlayers') ?? [];
  };

  useEffect(() => {
    let ignore = false;

    const loadPlayerData = async () => {
      const selectedPlayers: Player[] | null = await loadSelectedPlayers();
      if (!ignore) {
        setPlayers(selectedPlayers);
      }
    };
    loadPlayerData();
    return () => {
      ignore = true;
    };
  }, []);

  


  return (
    <Container maxWidth="sm" className='containerRoot'>
    <SectionHeader name="Game Time" url='/newgame'> </SectionHeader>
    <Container>
      <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom align='center'>{players[0]?.name || 'Loading...'} | Turns: {playerOneStats.turn}</Typography>
          <Box sx={{ color: 'gray', display: 'flex', justifyContent: 'space-around', mb:2 }}>
            <Typography variant="body1">Doubles: {playerOneStats.double}</Typography>
            <Typography variant="body1">Hits: {playerOneStats.hit}</Typography>
            <Typography variant="body1">No Play: {playerOneStats.noPlay}</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => increasePlayerOneStat('turn')}
              >
                <Typography variant='h6'>Rolled!</Typography>
              </Button>
            </Grid>
            <Grid item container xs={12} spacing={2} justifyContent="space-between">
              <Grid item xs>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => increasePlayerOneStat('double')}
                >
                  <Typography variant='h6'>Double</Typography> 
                </Button>
              </Grid>
              <Grid item xs>
                <Button 
                  variant="outlined" 
                  color='success' 
                  fullWidth 
                  onClick={() => increasePlayerOneStat('hit')}
                >
                  <Typography variant='h6'>Hit</Typography> 
                </Button>
              </Grid>
              <Grid item xs>
                <Button 
                  variant="outlined" 
                  color='warning' 
                  fullWidth 
                  onClick={() => increasePlayerOneStat('noPlay')}
                >
                  <Typography variant='h6'>No Play</Typography> 
                </Button>
              </Grid>
            </Grid>
          </Grid>
      </Box>
      <GameResults />
      <Box>
        <Typography variant="h4" gutterBottom align='center'>{players[1]?.name || 'Loading...'} | Turns: {playerTwoStats.turn}</Typography>
        <Box sx={{ color: 'gray', display: 'flex', justifyContent: 'space-around', mb:2}}>
          <Typography variant="body1">Doubles: {playerTwoStats.double}</Typography>
          <Typography variant="body1">Hits: {playerTwoStats.hit}</Typography>
          <Typography variant="body1">No Play: {playerTwoStats.noPlay}</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={() => increasePlayerTwoStat('turn')}
            >
              <Typography variant='h6'>Rolled!</Typography>
            </Button>
          </Grid>
          <Grid item container xs={12} spacing={2} justifyContent="space-between">
            <Grid item xs>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => increasePlayerTwoStat('double')}
              >
                <Typography variant='h6'>Double</Typography> 
              </Button>
            </Grid>
            <Grid item xs>
              <Button 
                variant="outlined" 
                color='success' 
                fullWidth 
                onClick={() => increasePlayerTwoStat('hit')}
              >
                <Typography variant='h6'>Hit</Typography> 
              </Button>
            </Grid>
            <Grid item xs>
              <Button 
                variant="outlined" 
                color='warning' 
                fullWidth 
                onClick={() => increasePlayerTwoStat('noPlay')}
              >
                <Typography variant='h6'>No Play</Typography> 
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </Container>
  );
};

export default GamePage;
