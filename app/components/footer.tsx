import { Container, Typography} from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Container maxWidth="sm" className='containerRoot' style={{marginBottom:"2rem", position: "fixed", bottom: 0, left: 0, right: 0}}>
            <Typography variant="subtitle1" textAlign="center" color="gray">Tavla Companion App by <Typography variant="subtitle1" textAlign="center" color="gray" display="inline" style={{fontStyle:"italic"}}>Alperen</Typography> </Typography> 
            <Typography variant="subtitle2" textAlign="center" color="gray">Copyright © 2023 All Rights Reserved</Typography>
        </Container>

    );
};

export default Footer;