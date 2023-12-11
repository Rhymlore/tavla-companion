import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { DialogContent, Button, DialogTitle, DialogActions, Dialog, Link, Snackbar, Grid, Typography} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { PlayerStats } from '../types/types';
import { saveGameToCloud } from '../tca-cloud-api';
import Timer from './timer';

const GameResults = () => {
    const initialPlayerStats: PlayerStats = {
        turn: 0,
        hit: 0,
        double: 0,
        noPlay: 0
      };

    const [firstDialog, setFirstDialog] = useState(false);
    const [secondDialog, setSecondDialog] = useState(false);
    const [playerOne, setPlayerOne] = useState<string>('');
    const [playerTwo, setPlayerTwo] = useState<string>('');
    const [playerOneStats, setPlayerOneStats] = useState<PlayerStats>(initialPlayerStats);
    const [playerTwoStats, setPlayerTwoStats] = useState<PlayerStats>(initialPlayerStats);
    const [winnerPlayer, setWinnerPlayer] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [time, setTime] = useState<number>(0);

    const timestamp = new Date().toISOString();
    const appName = 'tavla-companion-fall-2023';
    const gameId = uuidv4();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    
    const gameResultsData = {
            gameId: gameId,
            players: {
            playerOne: playerOne, 
            playerTwo: playerTwo, 
            },
            gameDuration: time, 
            playerOneStats: {
            turn: playerOneStats.turn,
            hit: playerOneStats.hit,
            double: playerOneStats.double,
            noPlay: playerOneStats.noPlay,
            },
            playerTwoStats: {
            turn: playerTwoStats.turn,
            hit: playerTwoStats.hit,
            double: playerTwoStats.double,
            noPlay: playerTwoStats.noPlay,
            },
            winnerPlayer: winnerPlayer, 
        };

    useEffect(() => {
        let ignore = false;
        
        const loadData = async () => {
            if (!ignore) {
            const loadedPlayerOne = await localforage.getItem<string>('playerOne') ?? '';
            const loadedPlayerTwo = await localforage.getItem<string>('playerTwo') ?? '';
            const loadedPlayerOneStats = {
                turn: await localforage.getItem<number>('playerOne.turn') ?? initialPlayerStats.turn,
                hit: await localforage.getItem<number>('playerOne.hit') ?? initialPlayerStats.hit,
                double: await localforage.getItem<number>('playerOne.double') ?? initialPlayerStats.double,
                noPlay: await localforage.getItem<number>('playerOne.noPlay') ?? initialPlayerStats.noPlay,
            };
            const loadedPlayerTwoStats = {
                turn: await localforage.getItem<number>('playerTwo.turn') ?? initialPlayerStats.turn,
                hit: await localforage.getItem<number>('playerTwo.hit') ?? initialPlayerStats.hit,
                double: await localforage.getItem<number>('playerTwo.double') ?? initialPlayerStats.double,
                noPlay: await localforage.getItem<number>('playerTwo.noPlay') ?? initialPlayerStats.noPlay,
            }
            const loadedWinnerPlayer = await localforage.getItem<string>('winnerPlayer') ?? '';
            const loadedEmail = await localforage.getItem<string>('email') ?? '';
            const loadedTime = await localforage.getItem<number>('time') ?? 0;

            setPlayerOne(loadedPlayerOne);
            setPlayerTwo(loadedPlayerTwo);
            setPlayerOneStats(loadedPlayerOneStats);
            setPlayerTwoStats(loadedPlayerTwoStats);
            setWinnerPlayer(loadedWinnerPlayer);
            setEmail(loadedEmail);
            setTime(loadedTime);
            }
        };
        
        loadData();
        
        return () => { 
            ignore = true; 
        };
        }, []);
    
    useEffect(() => {
        console.log(gameResultsData);
    }, [winnerPlayer, email, time, playerOne, playerTwo, playerOneStats, playerTwoStats])

    const handleFirstDialog = () => {
    firstDialog ? setFirstDialog(false) : setFirstDialog(true)
    };

    const handleSecondDialog = () => {
        secondDialog ? setSecondDialog(false) : setSecondDialog(true)
    };

    const handleFinishGame = (winnerPlayer: string) => {
    handleFirstDialog();
    localforage.setItem('winnerPlayer', winnerPlayer);
    handleSecondDialog();
    };

    const handleSaveGame = async () => {
        try {
            await saveGameToCloud(appName, timestamp, email, gameResultsData);
            setSnackbarMessage('Game saved successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Error saving game. Please try again.');
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Grid sx={{ border: 1, borderColor: 'divider', my: 3, p: 2 }}>
            <Timer> 
                <Button variant="contained" fullWidth onClick={handleFirstDialog}>
                    Finish Game
                </Button>
            </Timer>

            <Dialog open={firstDialog} onClose={handleFinishGame}>
            <DialogTitle>Who won the game?</DialogTitle>
            <DialogActions sx={{display:"flexbox", flexDirection:"row", justifyContent:"center"}}>
                <Button onClick={() => handleFinishGame(playerOne)}>{playerOne}</Button>
                <Button onClick={() => handleFinishGame(playerTwo)}>{playerTwo}</Button>
            </DialogActions>
            </Dialog>
            <Dialog open={secondDialog}>
            <DialogTitle textAlign={"center"}>{winnerPlayer} is the winner!</DialogTitle>
            <DialogContent>
            <Typography variant="body1" gutterBottom align='center'>Would you like to play again go back to the main menu?</Typography>
            <Typography variant="body1" gutterBottom align='center' sx={{fontWeight:"500"}}>Don't forget to save your game!</Typography> 
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

                <Button onClick={() => window.location.reload()}>Play Again!</Button>
                <Button><Link href="/" underline='none'>Go Back</Link></Button>
            </DialogActions>
            </Dialog>
        </Grid>
        );
};
export default GameResults;