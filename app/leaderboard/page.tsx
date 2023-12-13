'use client';
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Banner from '../components/banner';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { loadGamesFromCloud } from '../tca-cloud-api';
import { PlayerStatistics, GameResultProps } from '../types/types';
import SectionHeader from '../components/sectionHeader';

export default function Leaderboard() {
    const appName = 'tavla-companion-fall-2023';
    const [playerStatsArray, setPlayerStatsArray] = useState<PlayerStatistics[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = await localforage.getItem<string>('email');
                if (email) {
                    const gameResults = await loadGamesFromCloud(email, appName);
                    console.log("Raw game results from cloud:", gameResults); 
                    transformGameData(gameResults);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const transformGameData = (gameResults: GameResultProps[]) => {
        const statsMap = new Map<string, PlayerStatistics>();

        gameResults.forEach((gameResult) => {
            gameResult.players.forEach((player, index) => {
                if (!statsMap.has(player.name)) {
                    statsMap.set(player.name, {
                        name: player.name,
                        wins: 0,
                        losses: 0,
                        turn: 0,
                        double: 0,
                        hit: 0,
                        noPlay: 0,
                        totalDouble: 0,
                        totalHit: 0,
                        totalNoPlay: 0,
                        totalTurns: 0,
                        doubleRate: '',
                        hitRate: '',
                        noPlayRate: '',
                    });
                    console.log('Current turn stats:', gameResult.turns[index]);
                }

                const currentPlayerStats = statsMap.get(player.name);
                const currentTurnStats = gameResult.turns[index];

                if (currentPlayerStats) {
                    currentPlayerStats.totalTurns += currentTurnStats.turn;
                    currentPlayerStats.totalDouble += currentTurnStats.double;
                    currentPlayerStats.totalHit += currentTurnStats.hit;
                    currentPlayerStats.totalNoPlay += currentTurnStats.noPlay;

                    if (player.name === gameResult.winner) {
                        currentPlayerStats.wins += 1;
                    } else {
                        currentPlayerStats.losses += 1;
                    }

                    statsMap.set(player.name, {
                        ...currentPlayerStats,
                        doubleRate: calculateRate(currentPlayerStats.totalDouble, currentPlayerStats.totalTurns),
                        hitRate: calculateRate(currentPlayerStats.totalHit, currentPlayerStats.totalTurns),
                        noPlayRate: calculateRate(currentPlayerStats.totalNoPlay, currentPlayerStats.totalTurns)
                    });
                }
            });
        });

        setPlayerStatsArray(Array.from(statsMap.values()));
    };

    const calculateRate = (count: number, totalTurns: number): string => {
        return totalTurns > 0 ? ((count / totalTurns) * 100).toFixed(2) + '%' : '0%';
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
                        {playerStatsArray.map((player) => (
                            <TableRow key={player.name}>
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
