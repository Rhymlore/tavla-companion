import { useState } from 'react';
import Link from 'next/link';
import Buttons from './components/buttons';
import Typography from '@mui/material/Typography'

export default function AppShell() {
    const [title, setTitle] = useState<string>('Tavla Companion');
    const credits = "Developed by Alperen Bakirci";

    return (
      <>
        <Typography
        variant="h3" sx={{m: 1}}> 
          {title} 
        </Typography>
        <Buttons name="New Game" link="newGame"/>
        <Buttons name="Add Player" link="addPlayer"/>
        <Buttons name="Leaderboard" link="leaderboard"/>
        <Typography
        variant="overline"
        display="block"> 
          {credits} 
        </Typography>
      </>
    )
  }
  