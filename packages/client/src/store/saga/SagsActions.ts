import { createAction } from '@reduxjs/toolkit';
import { IFight, ILoginUserModel, IRegisterUserModel } from '../types/IUserModel';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const UPDATE_STATS = 'UPDATE_STATS';
const GET_ME = 'GET_ME';

const loginAction = createAction<ILoginUserModel>(LOGIN_REQUEST);
const logoutAction = createAction(LOGOUT_REQUEST);
const registerAction = createAction<IRegisterUserModel>(REGISTER_REQUEST);
const updateStatsAction = createAction<IFight>(UPDATE_STATS);
const getMeAction = createAction(GET_ME);

export { loginAction, logoutAction, registerAction, updateStatsAction, getMeAction };
