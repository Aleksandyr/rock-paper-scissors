import { Action } from '@reduxjs/toolkit';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import Api, { ICookie, IGetUserResponse, IRegisterUserResponse, IWinner, IWinnerResponse } from '../api/Api';
import {
  getMeAction,
  loginAction,
  logoutAction,
  registerAction,
  moveAction
} from './SagsActions';
import {
  login as loginSlice,
  logout as logoutSlice,
  updateCookie,
  move as moveSlice
} from '../slices/UserSlice';
import { IRegisterUser, IMove, ILoginUser } from '../types';
import { clearStats, updateStats } from '../slices/StatsSlice';
import { clearError, updateError } from '../slices/ErrorSlice';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

function* login(action: ActionWithPayload<ILoginUser>) {
  try {
    const loginReponse: ICookie = yield call([Api, Api.login], action.payload);
      yield put(updateCookie(loginReponse))
      yield getMe();
      yield put(clearError());
    } catch (err) {
    yield put(updateError({error: (err as Error).message}));
  }
}

function* getMe() {
  try {
    const getMeResponse: IGetUserResponse = yield call([Api, Api.getMe]);
      yield put(
        loginSlice({
          username: getMeResponse.username,
          email: getMeResponse.email,
        })
      );
      const stats = {
        wins: getMeResponse.stats.wins,
        losses: getMeResponse.stats.losses,
        draws: getMeResponse.stats.draws
      }
      yield put(updateStats(stats));
      yield put(clearError());
  } catch (err) {
    yield console.log((err as Error).message);
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
      yield put(clearError());
  } catch (err) {
    yield put(updateError({error: (err as Error).message}));
  }
}

function* logout() {
  try {
    yield call([Api, Api.logout]);
    yield put(logoutSlice());
    yield put(clearStats());
    yield put(clearError());
  } catch (err) {
    yield console.log((err as Error).message);
  }
}

function* move(action: ActionWithPayload<IMove>) {
  try {
    const winner: IWinnerResponse = yield call([Api, Api.move], action.payload);
    const moveResponse: IWinner = {
      computerMove: winner.computerMove,
      winner: winner.winner
    }
    yield put(moveSlice(moveResponse));
    yield put(updateStats(winner.stats));
  } catch (err) {
    yield console.log((err as Error).message);
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
