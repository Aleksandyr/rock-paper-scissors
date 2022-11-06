import React, { useEffect, useState } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from './components/header/Header';
import AuthForm from './components/authForm/authForm';
import GameField from './components/gameField/GameField';

import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthForm />
  },
  {
    path: '/game',
    element: <GameField />
  }
]);

function App() {

  const [username, setUsername] = useState('');

  useEffect(() => {

    fetch('/users/me')
      .then(response => response.json())
      .then((data) => setUsername(data.username))
      .catch((e) => console.log(e));

  })

  return (
    <div className="App">
      <Header username={username} />
      <div className="body">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
