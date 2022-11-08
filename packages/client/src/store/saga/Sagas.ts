import { Action } from '@reduxjs/toolkit';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import Api, { IServerReponse } from '../api/Api';
import { loginAction, logoutAction, registerAction } from './SagsActions';
import { login as loginSlice, loginError, logout as logoutSlice } from '../slices/UserSlice';
import { IUserModel } from '../types/IUserModel';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function* login(action: ActionWithPayload<IServerReponse>) {
  try {
    const loginReponse: IServerReponse = yield call([Api, Api.login], action.payload);
    let getMeResponse: IUserModel;
    if (loginReponse.successfulResopnse) {
      getMeResponse = yield call([Api, Api.getMe]);
      yield put(loginSlice({ 
        username: getMeResponse.username, 
        email: getMeResponse.email }));
    } else {
      yield put(loginError({errorMsg: loginReponse.errorMsg}))
    }

  } catch (e) {
    yield console.log(e);
  }
}

function* register(action: ActionWithPayload<IServerReponse>) {
  try {
    const registerResponse: IServerReponse = yield call([Api, Api.register], action.payload);
    if (registerResponse.successfulResopnse) {
      yield login(action);
    } else {
      yield put(loginError({errorMsg: registerResponse.errorMsg}));
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
    login,
    register,
    logout,
    takeEvery(loginAction.type, login),
    takeEvery(logoutAction.type, logout),
    takeEvery(registerAction.type, register)
  ]);
}
