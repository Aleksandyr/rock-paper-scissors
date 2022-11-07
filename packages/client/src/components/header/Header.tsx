import React from 'react';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LoginIcon from '../icons/LogoIcon';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutAction } from '../../store/saga/SagsActions';

import './Header.scss';


const Header = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAction());
    navigate('/');
  }

  return (
    <Paper elevation={2}>
      <div className="header">
        <div className="header__left logo-wrapper">
          <LoginIcon sx={{ fontSize: 70 }}></LoginIcon>
        </div>
        <div className="header__right">
          <p className="header__username">{user.username}</p>
          <Button variant="text" onClick={onLogout}>Logout</Button>
        </div>
      </div>
    </Paper>
  );
};

export default Header;
