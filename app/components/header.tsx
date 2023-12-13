'use client';
import React, { useState, useEffect} from 'react';
import { AppBar, Button, Toolbar, Typography, Dialog, useTheme, useMediaQuery, DialogContent, TextField, DialogTitle, DialogActions } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import localforage from 'localforage';

const Header: React.FC = () => {
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [email, setEmail] = useState<string>('');
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    useEffect(
        () => {
            const loadEmail = async () => {
                if (!ignore) {
                    setEmail(
                        await localforage.getItem<string>('email') ?? ''
                    );
                }
            };

            let ignore = false;
            loadEmail();

            return (
                () => { 
                    ignore = true; 
                }
            );
        }
        , []
        );


    return (
        <AppBar position="static" color="secondary" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}>
            <Toolbar style={{ justifyContent: 'center' }}>
                <Typography variant="h4">Tavla Companion</Typography>
                <Button onClick={() => setSettingsOpen(true)} color="inherit" style={{ marginLeft: 'auto' }}>
                    <AccountCircleIcon fontSize="large" />
                </Button>
                <Dialog
                fullScreen={fullScreen}
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                >
                    <DialogTitle>
                        {'Enter your email address to access your game history. We will never share your email with anyone else'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                        variant={email.length > 0 ? "contained" : "outlined"}
                        onClick={
                            async () => {
                            await localforage.setItem('email', email);
                            setSettingsOpen(false);
                        }}
                        autoFocus
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Toolbar>
        </AppBar>
    );
};

export default Header;