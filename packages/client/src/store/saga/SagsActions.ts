import { createAction } from "@reduxjs/toolkit";
import { UserModel } from "../types/UserModel";

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const REGISTER_REQUEST = 'REGISTER_REQUEST';

const loginAction = createAction<UserModel>(LOGIN_REQUEST);
const logoutAction = createAction(LOGOUT_REQUEST);
const registerAction = createAction<UserModel>(REGISTER_REQUEST);

export { loginAction, logoutAction, registerAction }