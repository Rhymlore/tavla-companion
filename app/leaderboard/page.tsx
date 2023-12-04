import SectionHeader from '../components/sectionHeader'; // Import the sectionHeader component with proper casing
import React from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Banner from '../components/banner';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

type PlayerStats = {
  id: number;
  name: string;
  wins: number;
  losses: number;
  winRate: string; // Could be a number, but formatted as string for display
};

const playerData: PlayerStats[] = [
  { id: 1, name: 'Alice', wins: 5, losses: 2, winRate: '71%' },
  { id: 2, name: 'Bob', wins: 3, losses: 4, winRate: '43%' },
  { id: 3, name: 'Charlie', wins: 2, losses: 3, winRate: '40%' },
  { id: 4, name: 'David', wins: 4, losses: 1, winRate: '80%' },
  // Add more players here
];
export default function Leaderboard() {
    return (
        <Container maxWidth="sm" className='containerRoot'>
          
          <SectionHeader name="Leaderboard"> <LeaderboardIcon /> </SectionHeader>{/* Use the imported SectionHeader component */}
          <Banner img="/images/leaderboard.png" />
          <TableContainer component={Paper}>
            <Table aria-label="leaderboard table">
              <TableHead>
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell align="right">Wins</TableCell>
                  <TableCell align="right">Losses</TableCell>
                  <TableCell align="right">Win Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playerData.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell component="th" scope="row">{player.name}</TableCell>
                    <TableCell align="right">{player.wins}</TableCell>
                    <TableCell align="right">{player.losses}</TableCell>
                    <TableCell align="right">{player.winRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
    );
}
