import { Action, ActionCreatorWithPayload, PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit';
import { put, all, takeEvery, call } from 'redux-saga/effects';

import Api from '../api/Api';
import { loginAction } from './SagsActions';
import { login } from '../slices/UserSlice';
import { UserModel } from '../types/UserModel';

export interface ActionWithPayload<T> extends Action {
    payload: T;
} 

function* loginSync(action: ActionWithPayload<UserModel>) {
    console.log(action);
    try {
        const loginReponse: Response = yield call([Api, Api.login], action.payload);
        let getMeResponse: UserModel;
        if (loginReponse.ok) {
            getMeResponse = yield call([Api, Api.getMe]);
            yield put(login({username: getMeResponse.username, email: getMeResponse.email}));
        }
    } catch(e) {
        yield console.log(e);
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(loginAction.type, loginSync)
    ])
}
