import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid } from '@mui/material'
import localforage from 'localforage';



const Timer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [time, setTime] = useState<number>(0);
    const [timerOn, setTimerOn] = useState<boolean>(true);

    let interval: NodeJS.Timeout;
    
    useEffect(() => {
      if (timerOn) {
        clearInterval(interval);
  
        interval = setInterval(() => {
          setTime(prevTime => {
            const newTime = prevTime + 1;
            localforage.setItem('time', newTime);
            return newTime;
          });
        }, 1000);
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [timerOn]);
  
    const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
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
            {children}
          </Grid>
      </Grid>
    </>
  );
};

export default Timer;
