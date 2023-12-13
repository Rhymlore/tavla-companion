import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { DialogContent, Button, DialogTitle, DialogActions, Dialog, Link, Snackbar, Grid, Typography} from '@mui/material';
import { PlayerStats, GameResultProps, GameTime, Player } from '../types/types';
import { saveGameToCloud } from '../tca-cloud-api';

const GameResults = () => {

    const initialPlayerStats: PlayerStats = {
        turn: 0,
        hit: 0,
        double: 0,
        noPlay: 0
      };

    const [firstDialog, setFirstDialog] = useState(false);
    const [secondDialog, setSecondDialog] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerOneStats, setPlayerOneStats] = useState<PlayerStats>(initialPlayerStats);
    const [playerTwoStats, setPlayerTwoStats] = useState<PlayerStats>(initialPlayerStats);
    const [winnerPlayer, setWinnerPlayer] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [gameTime, setGameTime] = useState<GameTime>({ start: '', end: '' });

    const timestamp = new Date().toISOString();
    const appName = 'tavla-companion-fall-2023';
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const gameResultsData: GameResultProps = {
        start: gameTime.start,
	    end: gameTime.end,
	    winner: winnerPlayer,
	    players: players,
	    turns: [playerOneStats, playerTwoStats]
    };
    
    const setWinnerPlayerOnClick = (winnerPlayer: string) => {
        setWinnerPlayer(winnerPlayer);
        localforage.setItem('winnerPlayer', winnerPlayer);
    }

    useEffect(() => {
        let ignore = false;
        
        const selectedPlayers = async () => {
            const selectedPlayers: Player[] | null = await localforage.getItem<Player[]>('selectedPlayers') ?? [];
            if (!ignore) {
              setPlayers(selectedPlayers);
            }
          };
        const playerOneStats = async () => {
            const loadedPlayerOneStats = await localforage.getItem<PlayerStats>('playerOneStats');
            if (!ignore) {
                setPlayerOneStats(loadedPlayerOneStats ?? initialPlayerStats);
            }
        };
        const playerTwoStats = async () => {
            const loadedPlayerTwoStats = await localforage.getItem<PlayerStats>('playerTwoStats');
            if (!ignore) {
                setPlayerTwoStats(loadedPlayerTwoStats ?? initialPlayerStats);
            }
        };

        const email = async () => {
            const loadedEmail = await localforage.getItem<string>('email');
            if (!ignore) {
                setEmail(loadedEmail ?? '');
            }
        }
        
        selectedPlayers();
        playerOneStats();
        playerTwoStats();
        email();

        return () => { 
            ignore = true; 
        };
        }, []);

    useEffect(() => {
        setStartTimeOnClick();
        }, []);
    
    useEffect(() => {
        const gameResultsData = {
            start: gameTime.start,
            end: gameTime.end,
            winner: winnerPlayer,
            players: players,
            turns: [playerOneStats, playerTwoStats]
        };
        // Save to localForage if needed, or use it for other purposes
        localforage.setItem('gameResults', gameResultsData);
    }, [gameTime, winnerPlayer, players, playerOneStats, playerTwoStats]);

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
        );
};
export default GameResults;