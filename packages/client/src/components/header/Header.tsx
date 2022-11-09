import React, { useEffect } from 'react';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LoginIcon from '../Icons/LogoIcon';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutAction } from '../../store/saga/SagsActions';
import { selectCookieToken, selectUsername } from '../../store/slices/UserSlice';

import './Header.scss';

const Header = () => {
  const username = useAppSelector(selectUsername);
  const cookie = useAppSelector(selectCookieToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!cookie) {
      navigate('/login');
    }
  }, [cookie])
  
  const onLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Paper elevation={2}>
      <div className="header">
        <div className="header__left logo-wrapper">
          <LoginIcon sx={{ fontSize: 70 }}></LoginIcon>
        </div>
        <div className="header__right">
          <p className="header__username">{username}</p>
          <Button variant="text" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default Header;
