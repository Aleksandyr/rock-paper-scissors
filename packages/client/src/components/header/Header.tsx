import React from 'react';
import { Button, Paper } from '@mui/material';
import LoginIcon from '../icons/LogoIcon';

import { useAppSelector } from '../../store/hooks';

import './Header.scss';


const Header = () => {
  const user = useAppSelector(state => state.user);

  return (
    <Paper elevation={2}>
      <div className="header">
        <div className="header__left logo-wrapper">
          <LoginIcon sx={{ fontSize: 70 }}></LoginIcon>
        </div>
        <div className="header__right">
          <p className="header__username">{user.username}</p>
          <Button variant="text">Logout</Button>
        </div>
      </div>
    </Paper>
  );
};

export default Header;
