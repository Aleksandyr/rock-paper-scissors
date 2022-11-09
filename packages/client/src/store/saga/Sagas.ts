import { Action } from '@reduxjs/toolkit';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import Api, { IServerReponse } from '../api/Api';
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
  updateStats as updatedStatsSlice
} from '../slices/UserSlice';
import { IRegisterUserModel, ILoginUserModel, IStats, IFight } from '../types/IUserModel';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function* login(action: ActionWithPayload<IServerReponse>) {
  try {
    const loginReponse: IServerReponse = yield call([Api, Api.login], action.payload);
    if (loginReponse.successfulResponse) {
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
    const getMeResponse: IServerReponse = yield call([Api, Api.getMe]);
    if (getMeResponse.successfulResponse) {
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

function* register(action: ActionWithPayload<IRegisterUserModel>) {
  try {
    const registerResponse: IServerReponse = yield call([Api, Api.register], action.payload);
    if (registerResponse.successfulResponse) {
      yield login(action);
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

function* updateStats(action: ActionWithPayload<IFight>) {
  try {
    const stats: IFight = yield call([Api, Api.updateStats], action.payload);
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
