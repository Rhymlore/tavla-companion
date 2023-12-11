'use client';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, Paper, Typography } from '@mui/material';
import SectionHeader from '../components/sectionHeader';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import localforage from 'localforage';

type Player = {
  id: number;
  name: string;
};

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');

  useEffect(() => {
    const loadPlayers = async () => {
      const savedPlayers = await localforage.getItem<Player[]>('players');
      if (savedPlayers) {
        setPlayers(savedPlayers);
      }
    };

    loadPlayers();
  }, []);

  useEffect(() => {
    localforage.setItem('players', players);
  }, [players]);

  const handleRemovePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleAddPlayer = () => {
    const newPlayer: Player = {
      id: Math.max(0, ...players.map(p => p.id)) + 1, // Ensure unique ID
      name: newPlayerName,
    };
    setPlayers([...players, newPlayer]);
    setNewPlayerName(''); 
  };

    return (
        <Container maxWidth="sm" className='containerRoot'>
          <SectionHeader name="Players" url="/"> <PeopleAltIcon /> </SectionHeader>{/* Use the imported SectionHeader component */}
          <Paper elevation={3} style={{ padding: '16px' }} sx={{ my: 3 }}>
            <Typography variant="h5">Current Players</Typography>
            <List>
              {players.map(player => (
                <ListItem key={player.id}>
                  <ListItemText primary={player.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePlayer(player.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper elevation={3} style={{ margin: '16px 0', padding: '16px' }}>
            <Typography variant="h5" sx={{mb:3}}>Add New Player</Typography>
            <TextField
              label="Player Name"
              value={newPlayerName}
              onChange={e => setNewPlayerName(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAddPlayer} style={{ marginTop: '16px' }}>
              Add Player
            </Button>
          </Paper>
        </Container>
    );
}
