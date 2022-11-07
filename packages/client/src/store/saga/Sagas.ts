import { Action } from '@reduxjs/toolkit';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import Api from '../api/Api';
import { loginAction, logoutAction, registerAction } from './SagsActions';
import { login as loginSlice, logout as logoutSlice } from '../slices/UserSlice';
import { UserModel } from '../types/UserModel';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function* login(action: ActionWithPayload<UserModel>) {
  try {
    const loginReponse: Response = yield call([Api, Api.login], action.payload);
    let getMeResponse: UserModel;
    if (loginReponse.ok) {
      getMeResponse = yield call([Api, Api.getMe]);
      yield put(loginSlice({ username: getMeResponse.username, email: getMeResponse.email }));
    }
  } catch (e) {
    yield console.log(e);
  }
}

function* register(action: ActionWithPayload<UserModel>) {
  try {
    const registerResponse: Response = yield call([Api, Api.register], action.payload);
    if (registerResponse.ok) {
      yield login(action);
      // getMeResponse = yield call([Api, Api.getMe]);
      // yield put(loginSlice({username: getMeResponse.username, email: getMeResponse.email}));
    }
  } catch (e) {
    yield console.log(e);
  }
}

function* logout() {
  try {
    yield call([Api, Api.logout]);
    yield put(logoutSlice());
  } catch (e) {
    yield console.log(e);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(loginAction.type, login),
    takeEvery(logoutAction.type, logout),
    takeEvery(registerAction.type, register)
  ]);
}
