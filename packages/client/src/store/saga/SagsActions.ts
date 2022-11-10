import { createAction } from '@reduxjs/toolkit';

import { ILoginUserRequest, IRegisterUserRequest } from '../api/Api';
import { IMove  } from '../types';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const UPDATE_STATS = 'UPDATE_STATS';
const GET_ME = 'GET_ME';

const loginAction = createAction<ILoginUserRequest>(LOGIN_REQUEST);
const logoutAction = createAction(LOGOUT_REQUEST);
const registerAction = createAction<IRegisterUserRequest>(REGISTER_REQUEST);
const moveAction = createAction<IMove>(UPDATE_STATS);
const getMeAction = createAction(GET_ME);

export { loginAction, logoutAction, registerAction, moveAction, getMeAction };
