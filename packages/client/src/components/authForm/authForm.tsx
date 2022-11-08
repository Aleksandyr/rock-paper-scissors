import React, { ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAction, registerAction } from '../../store/saga/SagsActions';
import { selectUserErrorMsg } from '../../store/slices/UserSlice';

import './AuthForm.scss';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();
  const userErrorMsg = useAppSelector(selectUserErrorMsg);

  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
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
        confirmPassword: inputValues.confirmPassword,
        email: inputValues.email
      })
    );

    clearOnSubmit();
  };

  const onSignInClick = () => {
    if (isSignUp) {
      return setIsSignUp(false);
    }

    dispatch(loginAction({ username: inputValues.username, password: inputValues.password }));
    clearOnSubmit();
  };

  const clearOnSubmit = () => {
    setInputValues({
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    });
  };

  return (
    <div className="form-wrapper">
      <div className="form__message">{userErrorMsg}</div>
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
            value={inputValues.username}
            onChange={onInputChange}
          />

          {isSignUp ? (
            <>
              <TextField
                required
                id="standard-required"
                label="Email"
                placeholder="example@domain.com"
                variant="standard"
                margin="normal"
                name="email"
                value={inputValues.email}
                onChange={onInputChange}
              />

              <TextField
                required
                id="standard-password-input"
                label="confirmPassword"
                type="password"
                placeholder="confirm password"
                variant="standard"
                margin="normal"
                name="confirmPassword"
                value={inputValues.confirmPassword}
                onChange={onInputChange}
              />
            </>
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
            value={inputValues.password}
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
