import React, { useEffect, useState } from 'react';

import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';

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

  return (
    <div className="App">
      <Header />
      <div className="body">
        <Routes>
          <Route path='/' element={<AuthForm/>} />
          <Route path='/game' element={<GameField/>} />
          {/* <RouterProvider router={router}></RouterProvider> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
