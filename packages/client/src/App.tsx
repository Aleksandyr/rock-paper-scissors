import React, { useEffect } from 'react';

import Header from './components/header/Header';
import AuthForm from './components/authForm/authForm';

import './App.scss';
import GameField from './components/gameField/GameField';


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
        </div>
    </div>
  );
}

export default App;
