import { Container, ThemeProvider } from '@mui/material';
import theme from '../components/theme';
import SectionHeader from '../components/sectionHeader'; // Import the sectionHeader component with proper casing

export default function Leaderboard() {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" className='containerRoot'>
          <SectionHeader name="Leaderboard" /> {/* Use the imported SectionHeader component */}
        </Container>
      </ThemeProvider>
    );
}
