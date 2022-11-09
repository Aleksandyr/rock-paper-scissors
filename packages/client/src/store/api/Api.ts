import { IMove, ILoginUser, IRegisterUser, IStats, Winner } from '../types';
export interface IServerReponse {
  errorMsg: string;
  cookie?: string;
}

export interface ISuccesfulResponse {
  success: boolean;
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
  private static async get(url: string): Promise<IGetUserResponse | IServerReponse | ISuccesfulResponse> {
    const response = await fetch(url);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
      const error = response.status === 401 ? 'Wrong password or username' : data && data.message;
      return { success: false, errorMsg: error };
    }

    return { ...data, success: response.ok };
  }

  private static async post(
    url: string,
    body: IRegisterUser | ILoginUser | IMove | null,
    method = 'POST'
  ): Promise<IServerReponse & ISuccesfulResponse> {
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
      return { success: false, errorMsg: error };
    }
    const cookie = response.headers.get('cookie')?.split('=');
    let token;
    if (cookie) {
      token = cookie[cookie.length - 1];
    }
    return { ...data, success: response.ok, cookie: token };
  }

  static async login(user: ILoginUser): Promise<IServerReponse & ISuccesfulResponse> {
    return await Api.post(`/auth/login`, user);
  }

  static async register(user: IRegisterUser): Promise<IServerReponse> {
    return await Api.post(`/auth/register`, user);
  }

  static async getMe() {
    return await Api.get('/users/me');
  }

  static async logout() {
    return await Api.post('/auth/logout', null);
  }

  static async updateStats(stats: IMove): Promise<IServerReponse> {
    return await Api.post('/users/stats', stats, 'PUT');
  }
}
