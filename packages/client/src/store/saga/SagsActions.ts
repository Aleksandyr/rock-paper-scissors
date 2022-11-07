import { createAction } from "@reduxjs/toolkit";
import { UserModel } from "../types/UserModel";

const LOGIN_REQUEST = 'LOGIN_REQUEST';

const loginAction = createAction<UserModel>(LOGIN_REQUEST);

export { loginAction }