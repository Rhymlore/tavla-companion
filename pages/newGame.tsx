import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

const newGame = () => {
    return (
        <Box 
        sx={{
          textAlign:"center", 
          '& button': { m: 2 }, 
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'stretch', 
          alignContent: 'space-between',
          height: '100vh',
          justifyContent: 'space-around'
        }}>
            <Typography variant='h1'>New Game</Typography>
        </Box>
        );
}

export default newGame;
