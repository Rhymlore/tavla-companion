'use client'
import React, {useEffect, useState} from 'react';
import { Grid, Button, Typography, Container, Box} from '@mui/material';
import SectionHeader from '../components/sectionHeader';
import localforage from 'localforage';
import { PlayerStats } from '../types/types';
import GameResults from '../components/gameResults';

const initialPlayerStats: PlayerStats = {
  turn: 0,
  hit: 0,
  double: 0,
  noPlay: 0
};

const GamePage: React.FC = () => {
  const [playerOne, setPlayerOne] = useState<string>('');
  const [playerTwo, setPlayerTwo] = useState<string>('');
  const [playerOneStats, setPlayerOneStats] = useState<PlayerStats>(initialPlayerStats);
  const [playerTwoStats, setPlayerTwoStats] = useState<PlayerStats>(initialPlayerStats);

  const increasePlayerOneTurns = () => {
    setPlayerOneStats(prevStats => {
      const newTurnCount = playerOneStats.turn + 1;
      localforage.setItem('playerOne.turn', newTurnCount);
      return {
      ...prevStats,
      turn: newTurnCount,
      }
    });
  }

  const increasePlayerOneHit = () => {
    setPlayerOneStats(prevStats => {
      const newHitCount = playerOneStats.hit + 1;
      localforage.setItem('playerOne.hit', newHitCount);

      return {
      ...prevStats,
      hit: newHitCount,
    }
    });
  };
  
  const increasePlayerOneDouble = () => {
    setPlayerOneStats(prevStats => {
      const newDoubleCount = prevStats.double + 1;
      localforage.setItem('playerOne.double', newDoubleCount);
  
      return {
        ...prevStats,
        double: newDoubleCount,
      };
    });
  };
  
  const increasePlayerOneNoPlay = () => {
    setPlayerOneStats(prevStats => {
      const newNoPlayCount = prevStats.noPlay + 1;
      localforage.setItem('playerOne.noPlay', newNoPlayCount);
  
      return {
        ...prevStats,
        noPlay: newNoPlayCount,
      };
    });
  };

  const increasePlayerTwoTurns = () => {
    setPlayerTwoStats(prevStats => {
      const newTurnCount = playerTwoStats.turn + 1;
      localforage.setItem('playerTwo.turn', newTurnCount);
      return {
      ...prevStats,
      turn: newTurnCount,
      }
    });
  }

  
  const increasePlayerTwoHit = () => {
    setPlayerTwoStats(prevStats => {
      const newHitCount = prevStats.hit + 1;
      localforage.setItem('playerTwo.hit', newHitCount);
  
      return {
        ...prevStats,
        hit: newHitCount,
      };
    });
  };
  
  const increasePlayerTwoDouble = () => {
    setPlayerTwoStats(prevStats => {
      const newDoubleCount = prevStats.double + 1;
      localforage.setItem('playerTwo.double', newDoubleCount);
  
      return {
        ...prevStats,
        double: newDoubleCount,
      };
    });
  };
  
  const increasePlayerTwoNoPlay = () => {
    setPlayerTwoStats(prevStats => {
      const newNoPlayCount = prevStats.noPlay + 1;
      localforage.setItem('playerTwo.noPlay', newNoPlayCount);
  
      return {
        ...prevStats,
        noPlay: newNoPlayCount,
      };
    });
  };

  useEffect(() => {

      const loadPlayerOne = async () => {
        if (!ignore) {
          setPlayerOne(await localforage.getItem<string>('playerOne') ?? '') 
        }
      };
      const loadPlayerTwo = async () => {
        if (!ignore) {
          setPlayerTwo(await localforage.getItem<string>('playerTwo') ?? '') 
        }
      };
      let ignore = false;
      loadPlayerOne();
      loadPlayerTwo();

      return (
          () => { 
              ignore = true; 
          }
      );
  }, []
  );

  return (
    <Container maxWidth="sm" className='containerRoot'>
    <SectionHeader name="Game Time" url='/newgame'> </SectionHeader>
    <Container>
      <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom align='center'>{playerOne} | Turns: {playerOneStats.turn}</Typography>
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
                onClick={increasePlayerOneTurns}
              >
                <Typography variant='h6'>Rolled!</Typography>
              </Button>
            </Grid>
            <Grid item container xs={12} spacing={2} justifyContent="space-between">
              <Grid item xs>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={increasePlayerOneDouble}
                >
                  <Typography variant='h6'>Double</Typography> 
                </Button>
              </Grid>
              <Grid item xs>
                <Button 
                  variant="outlined" 
                  color='success' 
                  fullWidth 
                  onClick={increasePlayerOneHit}
                >
                  <Typography variant='h6'>Hit</Typography> 
                </Button>
              </Grid>
              <Grid item xs>
                <Button 
                  variant="outlined" 
                  color='warning' 
                  fullWidth 
                  onClick={increasePlayerOneNoPlay}
                >
                  <Typography variant='h6'>No Play</Typography> 
                </Button>
              </Grid>
            </Grid>
          </Grid>
      </Box>
      <GameResults />
      <Box>
        <Typography variant="h4" gutterBottom align='center'>{playerTwo} | Turns: {playerTwoStats.turn}</Typography>
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
              onClick={increasePlayerTwoTurns}
            >
              <Typography variant='h6'>Rolled!</Typography>
            </Button>
          </Grid>
          <Grid item container xs={12} spacing={2} justifyContent="space-between">
            <Grid item xs>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={increasePlayerTwoDouble}
              >
                <Typography variant='h6'>Double</Typography> 
              </Button>
            </Grid>
            <Grid item xs>
              <Button 
                variant="outlined" 
                color='success' 
                fullWidth 
                onClick={increasePlayerTwoHit}
              >
                <Typography variant='h6'>Hit</Typography> 
              </Button>
            </Grid>
            <Grid item xs>
              <Button 
                variant="outlined" 
                color='warning' 
                fullWidth 
                onClick={increasePlayerTwoNoPlay}
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
