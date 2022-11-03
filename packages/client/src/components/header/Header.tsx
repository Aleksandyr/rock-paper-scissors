import React from 'react';
import { Paper } from "@mui/material";
import LoginIcon from '../icons/LogoIcon';

import './Header.scss';

const Header = () => {
    return (
        <Paper elevation={2}>
            <div className="header">
                <div className="logo-wrapper">
                    <LoginIcon sx={{ fontSize: 70 }} viewBox='0 0 80 90'></LoginIcon>
                </div>
            </div>
        </Paper>
    )
}

export default Header;