import React, { useEffect } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Game from './components/Game/Game';
import AuthForm from './components/AuthForm/AuthForm';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectUserLoggedIn } from './store/slices/UserSlice';
import { getMeAction } from './store/saga/SagsActions';

import './App.scss';

let initialLoad = true;

function App() {
  const userLoggedIn = useAppSelector(selectUserLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialLoad) {
      dispatch(getMeAction());
      initialLoad = false;
      return;
    }

    if (userLoggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [userLoggedIn]);

  return (
    <div className="App">
      <Header />
      <div className="body">
        <Routes>
          <Route path="/" element={<Game />} />
          {/* {
            } */}
          {/* userLoggedIn &&  */}
          <Route path="/login" element={<AuthForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
