import { Action } from '@reduxjs/toolkit';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import Api, { IGetUserResponse, ILogin, IRegisterUserResponse, IServerReponse, ISuccesfulResponse, IWinnerResponse } from '../api/Api';
import {
  getMeAction,
  loginAction,
  logoutAction,
  registerAction,
  updateStatsAction
} from './SagsActions';
import {
  login as loginSlice,
  loginError,
  logout as logoutSlice,
  updateCookie,
  updateStats as updatedStatsSlice
} from '../slices/UserSlice';
import { IRegisterUser, IMove, ILoginUser } from '../types';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function* login(action: ActionWithPayload<ILoginUser>) {
  try {
    const loginReponse: IServerReponse & ISuccesfulResponse = yield call([Api, Api.login], action.payload);
    if (loginReponse.success) {
      yield put(updateCookie(loginReponse))
      yield getMe();
    } else {
      yield put(loginError({ errorMsg: loginReponse.errorMsg }));
    }
  } catch (e) {
    yield console.log(e);
  }
}

function* getMe() {
  try {
    const getMeResponse: IGetUserResponse & IServerReponse & ISuccesfulResponse = yield call([Api, Api.getMe]);
    if (getMeResponse.success) {
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
    }
  } catch (e) {
    yield console.log(e);
  }
}

function* register(action: ActionWithPayload<IRegisterUser>) {
  try {
    const registerResponse: IRegisterUserResponse & IServerReponse & ISuccesfulResponse 
      = yield call([Api, Api.register], action.payload);
    if (registerResponse.success) {
      const loginUser: ActionWithPayload<ILoginUser> = {
        type: '',
        payload: {
          username: registerResponse.username,
          password: action.payload.password
        }
      }
      yield login(loginUser);
    } else {
      yield put(loginError({ errorMsg: registerResponse.errorMsg }));
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

function* updateStats(action: ActionWithPayload<IMove>) {
  try {
    const stats: IWinnerResponse = yield call([Api, Api.updateStats], action.payload);
    yield put(updatedStatsSlice(stats));
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
    takeEvery(updateStatsAction.type, updateStats)
  ]);
}
