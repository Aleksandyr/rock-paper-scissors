import { IFight, ILoginUserModel, IRegisterUserModel, IStats } from '../types/IUserModel';
export interface IServerReponse extends ILoginUserModel {
  successfulResponse?: boolean;
  errorMsg?: string;
  cookie?: string;
}

export default class Api {
  private static async get(url: string) {
    const response = await fetch(url);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
      const error = response.status === 401 ? 'Wrong password or username' : data && data.message;
      return { successfulResponse: false, errorMsg: error };
    }

    return { ...data, successfulResponse: response.ok };
  }

  private static async post(
    url: string,
    body: IRegisterUserModel | IFight,
    method = 'POST'
  ): Promise<IServerReponse> {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    if (!response.ok) {
      const error = response.status === 401 ? 'Wrong password or username' : data && data.message;
      return { successfulResponse: false, errorMsg: error };
    }
    const cookie = response.headers.get('cookie')?.split('=');
    let token;
    if (cookie) {
      token = cookie[cookie.length - 1];
    }
    return { ...data, successfulResponse: response.ok, cookie: token };
  }

  static async login(user: ILoginUserModel): Promise<IServerReponse> {
    return await Api.post(`/auth/login`, user);
  }

  static async register(user: IRegisterUserModel): Promise<IServerReponse> {
    return await Api.post(`/auth/register`, user);
  }

  static async getMe() {
    return await Api.get('/users/me');
  }

  static async logout() {
    return await Api.post('/auth/logout', {});
  }

  static async updateStats(stats: IFight): Promise<IServerReponse> {
    return await Api.post('/users/stats', stats, 'PUT');
  }
}
