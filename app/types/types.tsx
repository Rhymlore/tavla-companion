export type PlayerStats = {
    turn: number;
    hit: number;
    double: number;
    noPlay: number;
  };
export type GameResultsData = {
        gameId: string;
        players: {
            playerOne: string;
            playerTwo: string;
        };
        gameDuration: number;
        playerOneStats: PlayerStats;
        playerTwoStats: PlayerStats;
        winnerPlayer: string;
};

export type PlayerStatistics = {
    name: string;
    wins: number;
    losses: number;
    totalTurns: number;
    doubleRate: string;
    hitRate: string;
    noPlayRate: string;
};

export type GameResult = {
    playerOne: string;
    playerTwo: string;
    winnerPlayer: string;
    playerOneStats: PlayerStatDetails;
    playerTwoStats: PlayerStatDetails;
};

export type PlayerStatDetails = {
    turn: number;
    hit: number;
    double: number;
    noPlay: number;
};