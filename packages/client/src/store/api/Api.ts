import { IMove, IStats, ILogin, IWinner } from '../types';

export interface IErrorMessage {
  error: string;
}
export interface ILoginUserRequest {
  username: string;
  password: string;
}

export interface IRegisterUserRequest extends ILogin {
  password: string;
  confirmPassword: string;
}
export interface IGetUserResponse extends ILogin {
  stats: IStats;
}

export interface IRegisterUserResponse extends ILogin {
  password: string;
  stats: IStats;
}

export interface IWinnerResponse extends IWinner {
  stats: IStats;
}
export default class Api {
  private static async get(url: string) {
    const response = await fetch(url);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
      const error = data && data.message;
      throw new Error(error);
    }

    return data;
  }

  private static async post(
    url: string,
    body: IRegisterUserRequest | ILoginUserRequest | IMove | null,
    method = 'POST'
  ) {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: body && JSON.stringify(body)
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const error = response.status === 401 ? 'Wrong password or username' : data && data.message;
      throw new Error(error);
    }

    const cookie = response.headers.get('cookie')?.split('=');
    let token;
    if (cookie) {
      token = cookie[cookie.length - 1];
      return { ...data, cookie: token };
    }

    return data;
  }

  static login(user: ILoginUserRequest) {
    return Api.post(`/auth/login`, user);
  }

  static register(user: IRegisterUserRequest) {
    return Api.post(`/auth/register`, user);
  }

  static getMe() {
    return Api.get('/users/me');
  }

  static logout() {
    return Api.post('/auth/logout', null);
  }

  static move(stats: IMove) {
    return Api.post('/users/move', stats, 'PUT');
  }
}
