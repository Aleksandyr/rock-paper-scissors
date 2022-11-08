import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAction, registerAction } from '../../store/saga/SagsActions';
import { selectUserErrorMsg } from '../../store/slices/UserSlice';

import './AuthForm.scss';

// let initialLoad = true;

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();
  const userErrorMsg = useAppSelector(selectUserErrorMsg);

  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
    email: ''
  });

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [evt.target.name]: evt.target.value
    });
  };

  const onSignUpClick = () => {
    if (!isSignUp) {
      return setIsSignUp(true);
    }

    dispatch(
      registerAction({
        username: inputValues.username,
        password: inputValues.password,
        email: inputValues.email
      })
    );
  };

  const onSignInClick = () => {
    if (isSignUp) {
      return setIsSignUp(false);
    }

    dispatch(loginAction({ username: inputValues.username, password: inputValues.password }));
  };

  return (
    <div className="form-wrapper">
      <div className='form__message'>{userErrorMsg}</div>
      <form action="" className="form">
        <div className="form__inputs">
          <TextField
            required
            id="standard-required"
            label="Username"
            placeholder="Username"
            variant="standard"
            margin="normal"
            name="username"
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
              name="email"
              onChange={onInputChange}
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
            name="password"
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
