import { createAction } from '@reduxjs/toolkit';
import { IUserModel } from '../types/IUserModel';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const REGISTER_REQUEST = 'REGISTER_REQUEST';

const loginAction = createAction<IUserModel>(LOGIN_REQUEST);
const logoutAction = createAction(LOGOUT_REQUEST);
const registerAction = createAction<IUserModel>(REGISTER_REQUEST);

export { loginAction, logoutAction, registerAction };
