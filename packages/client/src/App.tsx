import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Game from './components/Game/Game';
import AuthForm from './components/AuthForm/AuthForm';
import { useAppDispatch } from './store/hooks';
import { getMeAction } from './store/saga/SagsActions';

import './App.scss';

let initialLoad = true;

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    
    dispatch(getMeAction());
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
