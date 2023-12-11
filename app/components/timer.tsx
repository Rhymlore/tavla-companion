import { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material'
import localforage from 'localforage';
import GameResults from './gameResults';



const Timer: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [timerOn, setTimerOn] = useState<boolean>(true);

    useEffect(() => {
      let interval: NodeJS.Timeout;
  
      if (timerOn) {
        // Clear existing interval before setting a new one
        clearInterval(interval);
  
        interval = setInterval(async () => {
          setTime(prevTime => {
            const newTime = prevTime + 1;
            localforage.setItem('time', newTime); // Update localforage value
            return newTime;
          });
        }, 1000);
      } else {
        clearInterval(interval);
      }

      // Clear interval when the component unmounts or timer stops
      return () => clearInterval(interval);
    }, [timerOn]);
  
      // Function to format the time into 00:00 format
    const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Format minutes and seconds to always be two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Grid sx={{ border: 1, borderColor: 'divider', my: 3, p: 2 }}>
      <Grid item xs={12} justifyContent="center">
        <Typography variant='h3' align='center'>{formatTime(time)}</Typography>
      </Grid>
      <Grid item container xs={12} spacing={2} justifyContent="space-between" sx={{mt:1}}>
        <Grid item xs>
          <Button variant="outlined" onClick={() => setTimerOn(prevState => !prevState)} fullWidth>
            {timerOn ? "Pause" : "Resume"}
          </Button>
        </Grid>
        <Grid item xs>
          <GameResults />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Timer;
