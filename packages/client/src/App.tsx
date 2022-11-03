import React, { useEffect } from 'react';

import Header from './components/header/Header';
import AuthForm from './components/authForm/authForm';

import './App.scss';


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
          <AuthForm />
        </div>
    </div>
  );
}

export default App;
