import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const SectionHeader: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => {
    return (
        <AppBar position="static" color="secondary" sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={'/'} passHref style={{ color: 'inherit' }}>
                    <IconButton edge="start" color="inherit" aria-label="back">
                        <ArrowBackIcon fontSize='large'/>
                    </IconButton>
                </Link>
                
                <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {children}
                    {name}
                </Typography>
                
                <div style={{ width: 48 }} /> {/* Placeholder to balance the back icon */}
            </Toolbar>
        </AppBar>
    );
};

export default SectionHeader;
