import { ILoginUserModel, IRegisterUserModel, IStats } from '../types/IUserModel';
export interface IServerReponse extends ILoginUserModel { 
  successfulResponse?: boolean,
  errorMsg?: string;
}

export default class Api {

  private static async get(url: string) {
    const response = await fetch(url)
    return await response.json();
  }

  private static async post(url: string, body: IRegisterUserModel | IStats, method = 'POST'): Promise<IServerReponse> { 
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const isJson =  response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    if(!response.ok) {
      const error = response.status === 401 ?
          'Wrong password or username' :
          data && data.message;
        return {successfulResponse: false, errorMsg: error};
    }

    return {...data, successfulResponse: response.ok};
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

  static async updateStats(stats: IStats): Promise<IServerReponse> {
    return await Api.post('/users/stats', stats, 'PUT')
  }
}
