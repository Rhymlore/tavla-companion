export type PlayerStats = {
    turn: number;
    hit: number;
    double: number;
    noPlay: number;
  };

export type GameTime = {
    start: string;
    end: string;
}

export type Player = {
id: number;
name: string;
};

export type PlayerStatistics = {
    name: string;
    wins: number;
    losses: number;
    turn: number;
    double: number;
    hit: number;
    noPlay: number;
    totalDouble: number;
    totalHit: number;
    totalNoPlay: number;
    totalTurns: number;
    doubleRate: string;
    hitRate: string;
    noPlayRate: string;
};

export interface GameResultProps {
	start: GameTime['start'];
	end: GameTime['end'];
	winner: string;
	players: Player[];
	turns: PlayerStats[];
};

export type PlayerStatDetails = {
    turn: number;
    hit: number;
    double: number;
    noPlay: number;
};