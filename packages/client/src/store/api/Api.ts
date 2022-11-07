import { UserModel } from "../types/UserModel";

export default class Api {
    // private static url = 'http://localhost:3200';

    private static get(url: string) {
        return fetch(url).then(response => response.json());
    }

    private static post(url: string, body: UserModel) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    static login(user: UserModel) {
        return Api.post(`/auth/login`, {username: user.username, password: user.password});
    }

    static getMe() {
        return Api.get('/users/me');
    }
} 