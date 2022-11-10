import { PayloadAction } from '@reduxjs/toolkit';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import sinon from 'sinon';

import { ICookie } from '../../store/types';
import Api, { ILoginUserRequest } from '../../store/api/Api';
import { loginAction } from '../../store/saga/SagsActions';
import { runSaga } from 'redux-saga';
import { updateCookie } from '../../store/slices/UserSlice';
import { login } from '../../store/saga/Sagas';
import { put } from 'redux-saga/effects';

describe('AuthForm: Redux Saga actions', () => {
  test('Login update token', () => {
    const loginArgs: ILoginUserRequest = {
      username: 'test',
      password: 'test'
    };
    const token = '123';

    const loginAciton = loginAction(loginArgs);
    const gen = cloneableGenerator(login)(loginAciton);
    const clone = gen.clone();

    clone.next();
    const updateToken = clone.next(token).value;
    const toEqual = put(updateCookie(token));

    expect(updateToken).toEqual(toEqual);
  });
});

describe('AuthForm: Redux Saga with mocked API calls', () => {
  test('Update cookie if successful logged in', async () => {
    const dispatched: Array<PayloadAction<ICookie>> = [];
    const expectCookie = 123;
    sinon.stub(Api, 'login').callsFake((user: ILoginUserRequest) => {
      return Promise.resolve({ cookie: expectCookie });
    });

    sinon.stub(Api, 'getMe').callsFake(() => {
      return Promise.resolve({ stats: { wins: 0, losses: 0, draws: 0 } });
    });

    const loginArgs: ILoginUserRequest = {
      username: 'user',
      password: 'pass'
    };
    const loginAciton = loginAction(loginArgs);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action as PayloadAction<ICookie>),
        getState: () => ({ state: 'test' })
      },
      login,
      loginAciton
    ).toPromise();

    const updateCookieAction = updateCookie(expectCookie);
    expect(dispatched[0].payload.cookie).toEqual(updateCookieAction.payload);
    expect(dispatched[0].type).toEqual(updateCookieAction.type);
  });
});
