import React from 'react';
import { Button, Paper } from '@mui/material';
import LoginIcon from '../icons/LogoIcon';

import './Header.scss';

export interface IHeaderProps {
  username: string;
}

const Header = (props: IHeaderProps) => {
  return (
    <Paper elevation={2}>
      <div className="header">
        <div className="header__left logo-wrapper">
          <LoginIcon sx={{ fontSize: 70 }}></LoginIcon>
        </div>
        <div className="header__right">
          <p className="header__username">{props?.username}</p>
          <Button variant="text">Logout</Button>
        </div>
      </div>
    </Paper>
  );
};

export default Header;
