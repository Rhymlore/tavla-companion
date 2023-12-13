'use client'
import React, {useEffect, useState} from 'react';
import { Grid, Button, Typography, Container, Box, DialogContent, DialogTitle, DialogActions, Dialog, Link, Snackbar} from '@mui/material';
import SectionHeader from '../components/sectionHeader';
import localforage from 'localforage';
import { PlayerStats, Player, GameTime, GameResultProps} from '../types/types';
import { saveGameToCloud } from '../tca-cloud-api';


const initialPlayerStats: PlayerStats = {
  turn: 0,
  hit: 0,
  double: 0,
  noPlay: 0
};

const GamePage: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [firstDialog, setFirstDialog] = useState(false);
  const [secondDialog, setSecondDialog] = useState(false);

  const [players, setPlayers] = useState<Player[]>([]);
  const [playerOneStats, setPlayerOneStats] = useState<PlayerStats>(initialPlayerStats);
  const [playerTwoStats, setPlayerTwoStats] = useState<PlayerStats>(initialPlayerStats);
  const [winnerPlayer, setWinnerPlayer] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gameTime, setGameTime] = useState<GameTime>({ start: '', end: '' });
  const gameResultsData:GameResultProps = {
    start: gameTime.start,
    end: gameTime.end,
    winner: winnerPlayer,
    players: players,
    turns: [playerOneStats, playerTwoStats]
  };

  const timestamp = new Date().toISOString();
  const appName = 'tavla-companion-fall-2023';

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

  const setWinnerPlayerOnClick = (winnerPlayer: string) => {
    setWinnerPlayer(winnerPlayer);
    localforage.setItem('winnerPlayer', winnerPlayer);
  }

  useEffect(() => {
    let ignore = false;

    const email = async () => {
      const loadedEmail = await localforage.getItem<string>('email');
      if (!ignore) {
          setEmail(loadedEmail ?? '');
      }
    };
    const loadPlayerData = async () => {
      const selectedPlayers: Player[] | null = await loadSelectedPlayers();
      if (!ignore) {
        setPlayers(selectedPlayers);
      }
    };

    loadPlayerData();
    email();

    return () => {
      ignore = true;
    };
    
  }, []);
  useEffect(() => {
    setStartTimeOnClick();
    }, []);

  
  const setStartTimeOnClick = () => {
    const newGameTime = {
        ...gameTime,
        start: new Date().toISOString(),
    };
    setGameTime(newGameTime);
    localforage.setItem('gameTime', newGameTime);
    };
  const setEndTimeOnClick = () => {
      const newGameTime = {
          ...gameTime,
          end: new Date().toISOString(),
      };
      setGameTime(newGameTime);
      localforage.setItem('gameTime', newGameTime);
      };

  const handleFirstDialog = () => {
    firstDialog ? setFirstDialog(false) : setFirstDialog(true)
    };

  const handleSecondDialog = () => {
      secondDialog ? setSecondDialog(false) : setSecondDialog(true)
  };

  const handleFinishGame = (winnerPlayer: string) => {
    handleFirstDialog();
    setWinnerPlayerOnClick(winnerPlayer);
    setEndTimeOnClick();
    handleSecondDialog();
    };

  const handleSaveGame = async () => {
    try {
        await saveGameToCloud(email, appName, timestamp, gameResultsData);
        setSnackbarMessage('Game saved successfully!');
        setSnackbarSeverity('success');
    } catch (error) {
        setSnackbarMessage('Error saving game. Please try again.');
        setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
    console.log (gameResultsData);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
    return;
    }
    setSnackbarOpen(false);
};

async function clearLocalForage() {
    try {
      const keysToKeep = ['players', 'email', 'selectedPlayers'];
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
    window.location.reload();
  }

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
      <Grid sx={{ border: 1, borderColor: 'divider', my: 3, p: 2 }}>
          <Button variant="contained" fullWidth onClick={handleFirstDialog}>
                  Finish Game
          </Button>
          <Dialog open={firstDialog} onClose={handleFinishGame}>
          <DialogTitle>Who won the game?</DialogTitle>
          <DialogActions sx={{display:"flexbox", flexDirection:"row", justifyContent:"center"}}>
              <Button onClick={() => handleFinishGame(players[0].name)}>{players[0]?.name || 'No Player Selected'}</Button>
              <Button onClick={() => handleFinishGame(players[1].name)}>{players[1]?.name || 'No Player Selected'}</Button>
          </DialogActions>
          </Dialog>
          <Dialog open={secondDialog}>
          <DialogTitle textAlign={"center"}>{winnerPlayer} is the winner!</DialogTitle>
          <DialogContent>
          <Typography variant="body1" gutterBottom align='center'>Would you like to play again go back to the main menu?</Typography>
          <Typography variant="body1" gutterBottom align='center' sx={{fontWeight:"500"}}>Dont forget to save your game!</Typography> 
          </DialogContent>
          <DialogActions sx={{display:"flexbox", flexDirection:"row", justifyContent:"center"}}>
              <Button onClick={handleSaveGame}>Save Game</Button>
              <Snackbar 
              open={snackbarOpen} 
              autoHideDuration={6000}
              onClose={(event: React.SyntheticEvent<Element, Event> | Event, reason) => handleClose(event as React.SyntheticEvent<Element, Event>, "clickaway")}
              color={snackbarSeverity}
              message={snackbarMessage}
              />

              <Button onClick={() => clearLocalForage()}>Play Again!</Button>
              <Button><Link href="/" underline='none'>Go Back</Link></Button>
          </DialogActions>
          </Dialog>
      </Grid>
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
