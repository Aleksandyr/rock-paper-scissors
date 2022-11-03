import React, { useEffect } from 'react';

import Header from './components/header/Header';

import './App.scss';
import LoginForm from './components/loginForm/LoginForm';


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
          <LoginForm />
        </div>
    </div>
  );
}

export default App;
