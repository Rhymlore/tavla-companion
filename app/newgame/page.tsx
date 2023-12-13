'use client';
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import SectionHeader from '../components/sectionHeader';
import { Button, Container, Typography, Paper, TextField, List, ListItem, ListItemText, Checkbox, Snackbar, Alert, ListItemSecondaryAction, IconButton } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import DeleteIcon from '@mui/icons-material/Delete';
import { loadGamesFromCloud } from '../tca-cloud-api';
import { Player, GameResultProps } from '../types/types';

export default function NewGame() {
  const appName = 'tavla-companion-fall-2023';
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; type?: 'success' | 'info' | 'warning' | 'error' }>({ open: false, message: '', type: 'info' });

  useEffect(() => {
    const fetchPlayersFromCloud = async () => {
        try {
            const email = await localforage.getItem<string>('email');
            if (email) {
                const gameResults: GameResultProps[] = await loadGamesFromCloud(email, appName);
                console.log("Raw game results from cloud:", gameResults);
                const cloudPlayers = new Set<string>();
                gameResults.forEach(game => {
                    game.players.forEach(p => cloudPlayers.add(p.name));
                });
                setPlayers(prevPlayers => {
                    const combinedPlayers = new Set(prevPlayers.map(p => p.name));
                    cloudPlayers.forEach(p => combinedPlayers.add(p));
                    return Array.from(combinedPlayers).map((name, index) => ({ id: index + 1, name }));
                });
            }
        } catch (error) {
            console.error('Error fetching player names from cloud:', error);
        }
    };
    fetchPlayersFromCloud();
}, []);


  useEffect(() => {
    localforage.setItem('players', players);
  }, [players]);

  useEffect(() => {
    const storeSelectedPlayers = async () => {
      await localforage.setItem('selectedPlayers', selectedPlayers);
    };

    storeSelectedPlayers();
  }, [selectedPlayers]);

  const handleAddPlayer = () => {
    if (!newPlayerName || /\d/.test(newPlayerName)) {
      setSnackbar({ open: true, message: 'Invalid player name. Names cannot be empty or contain numbers.', type: 'error' });
      return;
    }

    if (players.some(player => player.name.toLowerCase() === newPlayerName.toLowerCase())) {
      setSnackbar({ open: true, message: 'This player already exists. Please use a different name.', type: 'error' });
      return;
    }

    const newPlayer: Player = {
      id: players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1,
      name: newPlayerName.trim(),
    };
    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
    setSelectedPlayers(selectedPlayers.filter(player => player.id !== id));
  };

  const handleTogglePlayer = (player: Player) => {
    const selectedIndex = selectedPlayers.findIndex(p => p.id === player.id);
    let newSelectedPlayers: any[] | ((prevState: Player[]) => Player[]) = [];

    if (selectedIndex === -1) {
      newSelectedPlayers = newSelectedPlayers.concat(selectedPlayers, player);
    } else if (selectedIndex >= 0) {
      newSelectedPlayers = newSelectedPlayers.concat(
        selectedPlayers.slice(0, selectedIndex),
        selectedPlayers.slice(selectedIndex + 1)
      );
    }

    if (newSelectedPlayers.length > 2) {
      setSnackbar({ open: true, message: 'You can only select up to 2 players.', type: 'warning' });
      return;
    }

    setSelectedPlayers(newSelectedPlayers);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleStartGame = () => {
    if (selectedPlayers.length !== 2) {
      setSnackbar({ open: true, message: 'You need to select exactly 2 players to start the game.', type: 'error' });
    }
    else (
      window.location.href = `/game/`)
  };

  return (
    <Container maxWidth="sm" className='containerRoot'>
      <SectionHeader name="New Game" url='/'> <CasinoIcon/> </SectionHeader>
      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <Typography variant="h5">Add New Player</Typography>
        <TextField
          label="Player Name"
          value={newPlayerName}
          onChange={e => setNewPlayerName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddPlayer}>
          Add Player
        </Button>
      </Paper>

      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <Typography variant="h5">Choose Players</Typography>
        <List>
          {players.map(player => (
            <ListItem key={player.id} dense onClick={() => handleTogglePlayer(player)}>
              <Checkbox
                edge="start"
                checked={selectedPlayers.some(p => p.id === player.id)}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={player.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePlayer(player.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" sx={{ my: 3 }} fullWidth onClick={handleStartGame}>
          Start Game
        </Button>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
