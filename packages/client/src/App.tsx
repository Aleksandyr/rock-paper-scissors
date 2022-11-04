import React, { useEffect } from 'react';

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
  useEffect(() => {
    // fetch('/test')
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  });

  return (
    <div className="App">
      <Header />
      <div className="body">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
