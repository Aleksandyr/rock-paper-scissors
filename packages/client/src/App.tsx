import React, { useEffect } from 'react';

import Header from './components/header/Header';
import AuthForm from './components/authForm/authForm';

import './App.scss';
import GameField from './components/gameField/GameField';
import { Divider } from '@mui/material';
import Stats from './components/stats/Stats';


function App() {
  useEffect(() => {
    // fetch('/test')
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  });

  return (
    <div className="App">
        <Header />
        <div className="body">
          {/* <AuthForm /> */}
          <GameField />
          <Divider className='divider' />
          <Stats />
        </div>
    </div>
  );
}

export default App;
