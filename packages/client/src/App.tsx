import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Game from './components/Game/Game';
import AuthForm from './components/AuthForm/AuthForm';

import './App.scss';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <AuthForm />
//   },
//   {
//     path: '/game',
//     element: <GameField />
//   }
// ]);

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/game" element={<Game />} />
          {/* <RouterProvider router={router}></RouterProvider> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
