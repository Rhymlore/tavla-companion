'use client'
import theme from '../components/theme';
import SectionHeader from '../components/sectionHeader'; // Import the sectionHeader component with proper casing
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Container, ThemeProvider, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type Player = string; // Adjust according to your player data structure

export default function NewGame() {
  const [playerOne, setPlayerOne] = useState<Player>('');
  const [playerTwo, setPlayerTwo] = useState<Player>('');

  // Dummy player list - replace this with actual player data
  const players: Player[] = ['Alice', 'Bob', 'Charlie', 'Diana'];

  const handlePlayerChange = (event: ChangeEvent<{ value: unknown }>, playerSetter: React.Dispatch<React.SetStateAction<Player>>) => {
    playerSetter(event.target.value as Player);
  };

  const handleStartGame = () => {
    // Implement game start logic
    console.log(`Starting game with players: ${playerOne} and ${playerTwo}`);
    // Redirect to game screen (adjust the URL as needed)
    // window.location.href = '/game';
  };
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" className='containerRoot'>
          <SectionHeader name="New Game" /> {/* Use the imported SectionHeader component */}
          <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', mb: 4}}>
            Select two players from the list below to start a new game.
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="player-one-label">Player One</InputLabel>
            <Select
              labelId="player-one-label"
              id="player-one"
              value={playerOne}
              label="Player One"
              onChange={(e) => handlePlayerChange(e, setPlayerOne)}
            >
              {players.map((player, index) => (
                <MenuItem key={index} value={player}>{player}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="player-two-label">Player Two</InputLabel>
            <Select
              labelId="player-two-label"
              id="player-two"
              value={playerTwo}
              label="Player Two"
              onChange={(e) => handlePlayerChange(e, setPlayerTwo)}
            >
              {players.map((player, index) => (
                <MenuItem key={index} value={player}>{player}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleStartGame}>
            Start Game
          </Button>
        </Box>
        </Container>
      </ThemeProvider>
    );
}
