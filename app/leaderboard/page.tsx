'use client';
import SectionHeader from '../components/sectionHeader'; // Import the sectionHeader component with proper casing
import React, {useState, useEffect} from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Banner from '../components/banner';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { loadGamesFromCloud } from '../tca-cloud-api';
import localforage from 'localforage';
import { PlayerStatistics, GameResult } from '../types/types';
import Image from 'next/image'

export default function Leaderboard() {
    const [playerStats, setPlayerStats] = useState<PlayerStatistics[]>([]);
    const appName = 'tavla-companion-fall-2023';

  useEffect(() => {
    const fetchData = async () => {
        try {
            const email = await localforage.getItem<string>('email');
            if (email) {
                const gameResults: GameResult[] = await loadGamesFromCloud(email, appName);
                console.log("Raw game results from cloud:", gameResults); // Console log of the raw output from the cloud
                const stats = calculateStats(gameResults);
                setPlayerStats(stats);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

const calculateStats = (gameResults: GameResult[]): PlayerStatistics[] => {
  const statsMap = new Map<string, PlayerStatistics>();

  gameResults.forEach(({ playerOne, playerTwo, playerOneStats, playerTwoStats, winnerPlayer }) => {
      [playerOne, playerTwo].forEach(player => {
          if (!statsMap.has(player)) {
              statsMap.set(player, {
                  name: player,
                  wins: 0,
                  losses: 0,
                  totalTurns: 0,
                  doubleRate: '0%',
                  hitRate: '0%',
                  noPlayRate: '0%'
              });
          }

          const currentPlayerStats = player === playerOne ? playerOneStats : playerTwoStats;
          const playerStat = statsMap.get(player)!;

          playerStat.totalTurns += currentPlayerStats.turn;
          playerStat.doubleRate = calculateRate(playerStat.doubleRate, currentPlayerStats.double, playerStat.totalTurns);
          playerStat.hitRate = calculateRate(playerStat.hitRate, currentPlayerStats.hit, playerStat.totalTurns);
          playerStat.noPlayRate = calculateRate(playerStat.noPlayRate, currentPlayerStats.noPlay, playerStat.totalTurns);

          if (player === winnerPlayer) {
              playerStat.wins += 1;
          } else {
              playerStat.losses += 1;
          }

          statsMap.set(player, playerStat);
      });
  });

  return Array.from(statsMap.values());
};
  const calculateRate = (currentRate: string, additionalValue: number, totalTurns: number): string => {
    const rate = (parseFloat(currentRate.replace('%', '')) + additionalValue) / totalTurns * 100;
    return rate.toFixed(2) + '%';
  };

  return (
    <Container maxWidth="sm" className='containerRoot'>
        <SectionHeader name="Leaderboard" url="/"> <LeaderboardIcon /> </SectionHeader>
        <Banner img="/images/leaderboard.png" />
        <TableContainer component={Paper}>
            <Table aria-label="leaderboard table">
                <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell align="right">Wins</TableCell>
                        <TableCell align="right">Losses</TableCell>
                        <TableCell align="right">Double Rate</TableCell>
                        <TableCell align="right">Hit Rate</TableCell>
                        <TableCell align="right">No Play Rate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playerStats.map((player, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{player.name}</TableCell>
                            <TableCell align="right">{player.wins}</TableCell>
                            <TableCell align="right">{player.losses}</TableCell>
                            <TableCell align="right">{player.doubleRate}</TableCell>
                            <TableCell align="right">{player.hitRate}</TableCell>
                            <TableCell align="right">{player.noPlayRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
);
}
