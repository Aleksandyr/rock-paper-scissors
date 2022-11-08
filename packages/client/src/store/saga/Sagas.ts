import { Action } from '@reduxjs/toolkit';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import Api, { IServerReponse } from '../api/Api';
import { loginAction, logoutAction, registerAction, updateStatsAction } from './SagsActions';
import { login as loginSlice, loginError, logout as logoutSlice, updateStats as updatedStatsSlice } from '../slices/UserSlice';
import { IRegisterUserModel, ILoginUserModel, IStats } from '../types/IUserModel';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function* login(action: ActionWithPayload<IServerReponse>) {
  try {
    const loginReponse: IServerReponse = yield call([Api, Api.login], action.payload);
    let getMeResponse: ILoginUserModel;
    if (loginReponse.successfulResponse) {
      getMeResponse = yield call([Api, Api.getMe]);
      yield put(loginSlice({ 
          username: getMeResponse.username, 
          email: getMeResponse.email,
          stats: {
            wins: getMeResponse.stats.wins,
            losses: getMeResponse.stats.losses,
            draws: getMeResponse.stats.draws
          }
        } 
      ));
    } else {
      yield put(loginError({errorMsg: loginReponse.errorMsg}))
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

function* updateStats(action: ActionWithPayload<IStats>) {
  try {
    const stats: IStats = yield call([Api, Api.updateStats], action.payload);
    yield put(updatedStatsSlice(stats))
  } catch(e) {
    yield console.log(e);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(loginAction.type, login),
    takeEvery(logoutAction.type, logout),
    takeEvery(registerAction.type, register),
    takeEvery(updateStatsAction.type, updateStats),
  ]);
}
