import React, { useEffect } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import AuthForm from './components/AuthForm/AuthFrom';
import Game from './components/Game/Game';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getMeAction } from './store/saga/SagsActions';

import './App.scss';
import { selectCookieToken } from './store/slices/UserSlice';


function App() {
  const dispatch = useAppDispatch();
  const cookie = useAppSelector(selectCookieToken);
  const navigate = useNavigate();


  useEffect(() => {
    const token = cookie || localStorage.getItem('token');
    if(token) {
      dispatch(getMeAction());
      navigate('/game');
    }

    const localStorageToken = localStorage.getItem('token');
    if(!localStorageToken) {
      localStorage.setItem('token', cookie);
    }
  }, [cookie]);

  return (
    <div className="App">
      <Header />
      <div className="body">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
