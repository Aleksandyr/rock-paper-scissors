import { Action } from '@reduxjs/toolkit';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import Api, { ICookie, IGetUserResponse, IRegisterUserResponse, IWinnerResponse } from '../api/Api';
import {
  getMeAction,
  loginAction,
  logoutAction,
  registerAction,
  moveAction
} from './SagsActions';
import {
  login as loginSlice,
  errorLog,
  logout as logoutSlice,
  updateCookie,
  move as moveSlice
} from '../slices/UserSlice';
import { IRegisterUser, IMove, ILoginUser } from '../types';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function* login(action: ActionWithPayload<ILoginUser>) {
  try {
    const loginReponse: ICookie = yield call([Api, Api.login], action.payload);
      yield put(updateCookie(loginReponse))
      yield getMe();
    } catch (e) {
    yield put(errorLog({ error: e.toString() }));
  }
}

function* getMe() {
  try {
    const getMeResponse: IGetUserResponse = yield call([Api, Api.getMe]);
      yield put(
        loginSlice({
          username: getMeResponse.username,
          email: getMeResponse.email,
          stats: {
            wins: getMeResponse.stats.wins,
            losses: getMeResponse.stats.losses,
            draws: getMeResponse.stats.draws
          }
        })
      );
  } catch (e) {
    yield console.log(e);
  }
}

function* register(action: ActionWithPayload<IRegisterUser>) {
  try {
    const registerResponse: IRegisterUserResponse = yield call([Api, Api.register], action.payload);
      const loginUser: ActionWithPayload<ILoginUser> = {
        type: '',
        payload: {
          username: registerResponse.username,
          password: action.payload.password
        }
      }
      yield login(loginUser);
  } catch (errorMsg) {
    yield put(errorLog({ error: errorMsg.toString() }));
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

function* move(action: ActionWithPayload<IMove>) {
  try {
    const stats: IWinnerResponse = yield call([Api, Api.move], action.payload);
    yield put(moveSlice(stats));
  } catch (e) {
    yield console.log(e);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(loginAction.type, login),
    takeEvery(logoutAction.type, logout),
    takeEvery(registerAction.type, register),
    takeEvery(getMeAction.type, getMe),
    takeEvery(moveAction.type, move)
  ]);
}
