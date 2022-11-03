import { Button, TextField } from '@mui/material';
import React from 'react';

import './LoginForm.scss';

const LoginForm = () => {
    return (
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

                <TextField
                    required
                    id="standard-required"
                    label="Email"
                    placeholder='example@domain.com'
                    variant="standard"
                    margin="normal"
                />

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
                <Button className='form__buttons-login' variant="contained">Login</Button>
                <Button className='form__buttons-register' variant="outlined">Register</Button>    
            </div>
        </form>
    )
}

export default LoginForm;