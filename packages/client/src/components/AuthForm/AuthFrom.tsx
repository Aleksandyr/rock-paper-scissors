import React, { ChangeEvent, useState } from 'react';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAction, registerAction } from '../../store/saga/SagsActions';
import { clearError, selectError } from '../../store/slices/ErrorSlice';

import './AuthForm.scss';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useAppDispatch();
  const selectErrorMsg = useAppSelector(selectError);
  const [emailError, setEmailError] = useState('');

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

    if (!isEmailValid()) {
      setEmailError('Invalid emal');
      return;
    }

    if (isEmailValid()) {
      setEmailError('');
    }

    if (!allFieldsAreFilled()) {
      return;
    }

    dispatch(clearError());
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

    if (!allFieldsAreFilled()) {
      return;
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

  const isEmailValid = () => inputValues.email.includes('@');
  const allFieldsAreFilled = () => {
    const loginValidation = inputValues.username.length > 0 && inputValues.password.length > 0;
    return !isSignUp
      ? loginValidation
      : loginValidation && inputValues.confirmPassword.length > 0 && inputValues.email.length > 0;
  };

  return (
    <div className="form-wrapper">
      <form action="" className="form">
        <FormControl error={selectErrorMsg?.length > 0 || !isEmailValid()}>
          <FormHelperText>{emailError || selectErrorMsg}</FormHelperText>
          <div className="form__inputs">
            <TextField
              required
              error={inputValues.username.length < 3}
              id="standard-required"
              label="Username"
              placeholder="Username"
              variant="standard"
              margin="normal"
              name="username"
              helperText="3 to 10 characters"
              value={inputValues.username}
              onChange={onInputChange}
            />

            {isSignUp ? (
              <>
                <TextField
                  required
                  error={!isEmailValid()}
                  id="standard-required"
                  label="Email"
                  placeholder="example@domain.com"
                  variant="standard"
                  margin="normal"
                  name="email"
                  type="email"
                  helperText="example@domain.com"
                  value={inputValues.email}
                  onChange={onInputChange}
                />

                <TextField
                  required
                  error={inputValues.confirmPassword.length < 6}
                  id="standard-password-input"
                  label="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                  variant="standard"
                  margin="normal"
                  name="confirmPassword"
                  helperText={'6 to 40 characters'}
                  value={inputValues.confirmPassword}
                  onChange={onInputChange}
                />
              </>
            ) : (
              ''
            )}

            <TextField
              required
              error={inputValues.password.length < 6}
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              margin="normal"
              name="password"
              helperText="6 to 40 characters"
              value={inputValues.password}
              onChange={onInputChange}
            />
          </div>
        </FormControl>

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
