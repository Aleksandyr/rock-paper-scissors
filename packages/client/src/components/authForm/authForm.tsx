import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

import './authForm.scss';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const onSignUpClick = () => {
        setIsSignUp(true);
    }

    const onSignInClick = () => {
        setIsSignUp(false)
    }
    return (
        <div className="form-wrapper">
            <form action="" className='form'>
                <div className="form__inputs">
                    <TextField
                        required
                        id="standard-required"
                        label="Username"
                        placeholder='Username'
                        variant="standard"
                        margin="normal"
                    />
                    
                    {isSignUp ? 
                        <TextField
                            required
                            id="standard-required"
                            label="Email"
                            placeholder='example@domain.com'
                            variant="standard"
                            margin="normal"
                        />
                    : ''}

                    <TextField
                        required
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        margin="normal"
                    />
                </div>

                <div className='form__buttons'>
                    <Button className='form__buttons-login' variant="contained" onClick={onSignInClick}>{isSignUp ? 'Sign in' : 'Login'}</Button>
                    <Button className='form__buttons-register' variant="outlined" onClick={onSignUpClick}>Sign up</Button>    
                </div>
            </form>
        </div>
    )
}

export default AuthForm;