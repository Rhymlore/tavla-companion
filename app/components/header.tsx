import React from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';


const Header: React.FC = () => {

    return (
    <AppBar position="static" color="secondary" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}>
        <Toolbar style={{ justifyContent: 'center' }}>
            <Typography variant="h4">Tavla Companion</Typography>
        </Toolbar>
    </AppBar>
    );
};

export default Header;