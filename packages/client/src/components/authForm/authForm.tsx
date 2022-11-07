import React, { ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { loginAction } from '../../store/saga/SagsActions';

import './authForm.scss';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();

  const [inputValues, setInputValues] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const onInputChange = (evt:  ChangeEvent<HTMLInputElement>) => {   
    setInputValues({
      ...inputValues,
      [evt.target.name]: evt.target.value
    });
  }

  const onSignUpClick = () => {
    setIsSignUp(true);
  };

  const onSignInClick = () => {
    if (isSignUp) {
      return setIsSignUp(false);
    }

    dispatch(loginAction({username: inputValues.username, password: inputValues.password}));
    navigate('/game');
  };

  
  return (
    <div className="form-wrapper">
      <form action="" className="form">
        <div className="form__inputs">
          <TextField
            required
            id="standard-required"
            label="Username"
            placeholder="Username"
            variant="standard"
            margin="normal"
            name='username'
            onChange={onInputChange}
          />

          {isSignUp ? (
            <TextField
              required
              id="standard-required"
              label="Email"
              placeholder="example@domain.com"
              variant="standard"
              margin="normal"
              name='email'
            />
          ) : (
            ''
          )}

          <TextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            margin="normal"
            name='password'
            onChange={onInputChange}
          />
        </div>

        <div className="form__buttons">
          <Button className="form__buttons-login" variant="contained" onClick={onSignInClick}>
            {isSignUp ? 'Sign in' : 'Login'}
          </Button>
          <Button className="form__buttons-register" variant="outlined" onClick={onSignUpClick}>
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
