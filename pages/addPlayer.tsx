import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Footer from '@/app/components/Footer';
const addPlayer = () => {
    return (
        <Box 
            sx={{
            textAlign: "center",
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            '& button': { m: 2, flexGrow: 0 }, // Ensure buttons do not stretch
            '& > :not(button)': { flexGrow: 1 }, // Any child that's not a button should grow to fill space
            justifyContent: 'space-between', 
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'nowrap', // Prevent wrapping so the footer sticks to the bottom
            }}
        >
            <Typography variant='h1'>Add Player</Typography>
            <Footer />
        </Box>
        );
}

export default addPlayer;
