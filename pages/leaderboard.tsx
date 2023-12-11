import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

const leaderboard = () => {
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
            <Typography variant='h1'>Leaderboard</Typography>
        </Box>
        );
}

export default leaderboard;
