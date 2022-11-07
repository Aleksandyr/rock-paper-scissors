import React, { ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { loginAction, registerAction } from '../../store/saga/SagsActions';

import './AuthForm.scss';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();

  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
    email: ''
  });

  const navigate = useNavigate();

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

    navigate('/game');
  };

  const onSignInClick = () => {
    if (isSignUp) {
      return setIsSignUp(false);
    }

    dispatch(loginAction({ username: inputValues.username, password: inputValues.password }));
    navigate('/game');
  };

  // const testLogin = async () => {
  //   const response = await fetch('/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ username: '', password: '123456' })
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .then(
  //       (result) => {
  //         console.log(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };

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
