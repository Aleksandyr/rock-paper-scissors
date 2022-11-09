import { IMove, ILoginUser, IRegisterUser, IStats, Winner } from '../types';

export interface IErrorMessage {
  error: string;
}
export interface ICookie {
  cookie?: string;
}
export interface ILogin {
  username: string;
  email: string
}
export interface IGetUserResponse extends ILogin {
  stats: IStats;
}

export interface IRegisterUserResponse extends ILogin {
  password: string;
  stats: IStats;
}

export interface IWinnerResponse {
  computerMove: number
  winner: Winner,
  stats: IStats
}
export default class Api {
  private static async get(url: string) {
    const response = await fetch(url);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
      const error = data && data.message;
      throw new Error(error)
    }

    return data;
  }

  private static async post(
    url: string,
    body: IRegisterUser | ILoginUser | IMove | null,
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
      return {...data, cookie: token};
    }

    return data;
  }

  static login(user: ILoginUser) {
    return Api.post(`/auth/login`, user);
  }

  static register(user: IRegisterUser) {
    return Api.post(`/auth/register`, user);
  }

  static getMe() {
    return Api.get('/users/me');
  }

  static logout() {
    return Api.post('/auth/logout', null);
  }

  static updateStats(stats: IMove) {
    return Api.post('/users/stats', stats, 'PUT');

  }
}
