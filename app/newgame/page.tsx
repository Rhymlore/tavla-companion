'use client'
import SectionHeader from '../components/sectionHeader'; 
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Container, Typography, Paper, Link, SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import CasinoIcon from '@mui/icons-material/Casino';
import localforage from 'localforage';

type Player = {
  id: number;
  name: string;
};

export default function NewGame() {
  const [playerOne, setPlayerOne] = useState<Player | null>(null);
  const [playerTwo, setPlayerTwo] = useState<Player | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const storedPlayers: Player[] | null = await localforage.getItem('players');
      if (storedPlayers) {
        setPlayers(storedPlayers);
      }
    };

    fetchPlayers();
  }, []);

  const handlePlayerChange = (event:SelectChangeEvent<string> , playerSetter: React.Dispatch<React.SetStateAction<Player | null>>, playerName:string) => {
    const selectedPlayer = players.find(player => player.name === event.target.value);
    if (selectedPlayer) {
      playerSetter(selectedPlayer);
      localforage.setItem(playerName, selectedPlayer.name);
    }
  };

  const choosePlayerWarning = () => {
    alert("Please choose two players to start the new game");
  }

    return (
      <Container maxWidth="sm" className='containerRoot'>
        <SectionHeader name="New Game" url='/'> <CasinoIcon/> </SectionHeader> {/* Use the imported SectionHeader component */}
        <Box sx={{ my: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} style={{ padding: '16px', width:"100%" }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', mb: 4}}>
          Select two players from the list below to start a new game.
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="player-one-label">Player One</InputLabel>
          <Select
            labelId="player-one-label"
            id="player-one"
            value={playerOne ? playerOne.name : ''}
            label={playerOne ? playerOne.name : ''}
            onChange={(e) => handlePlayerChange(e, setPlayerOne, "playerOne")}
          >
            {players.map((player) => (
              <MenuItem key={player.id} value={player.name}>{player.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="player-two-label">Player Two</InputLabel>
          <Select
            labelId="player-two-label"
            id="player-two"
            value={playerTwo ? playerTwo.name : ''}
            label={playerTwo ? playerTwo.name : ''}
            onChange={(e) => handlePlayerChange(e, setPlayerTwo, "playerTwo")}
          >
            {players
              .filter((player) => playerOne ? player.name !== playerOne.name : true)
              .map((player) => (
                <MenuItem key={player.id} value={player.name}>{player.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {(!playerOne || !playerTwo) ? 
        <Button variant="contained" color="primary" sx={{ my: 3 }} onClick={choosePlayerWarning} fullWidth>
          Start Game
        </Button>
        :
        <Link href={'/game'} style={{ color: 'inherit' }}>
          <Button variant="contained" color="primary" sx={{ my: 3 }} fullWidth>
            Start Game
          </Button>
        </Link>
        }
        </Paper>
        
      </Box>
      </Container>
    );
}
