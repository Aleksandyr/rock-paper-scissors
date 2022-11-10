import React, { useEffect } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import AuthForm from './components/AuthForm/AuthFrom';
import Game from './components/Game/Game';
import { useAppDispatch } from './store/hooks';
import { getMeAction } from './store/saga/SagsActions';

import './App.scss';

let initialLoad = true;

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }

    dispatch(getMeAction());

    const token = localStorage.getItem('token');
    if(token) {
      navigate('/');
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="body">
        <Routes>
           <Route path="/" element={<Game />} />
          <Route path="/login" element={<AuthForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
