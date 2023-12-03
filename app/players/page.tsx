'use client';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, Paper, Typography, ThemeProvider } from '@mui/material';
import theme from '../components/theme';
import SectionHeader from '../components/sectionHeader'; // Import the sectionHeader component with proper casing
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type Player = {
  id: number;
  name: string;
};

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');

  const handleRemovePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleAddPlayer = () => {
    const newPlayer: Player = {
      id: players.length + 1, // This is a simple ID assignment, replace with your own ID logic
      name: newPlayerName,
    };
    setPlayers([...players, newPlayer]);
    setNewPlayerName(''); // Clear the input field
  };

    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" className='containerRoot'>
          <SectionHeader name="Players" /> {/* Use the imported SectionHeader component */}
          <Paper elevation={3} style={{ margin: '16px 0', padding: '16px' }}>
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
        <Typography variant="h5">Add New Player</Typography>
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
      </ThemeProvider>
    );
}