import { UserModel } from "../types/UserModel";

export default class Api {
    // private static url = 'http://localhost:3200';

    private static async get(url: string) {
        return await fetch(url).then(response => response.json());
    }

    private static async post(url: string, body: UserModel) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
    }

    static async login(user: UserModel) {
        return await Api.post(`/auth/login`, {username: user.username, password: user.password});
    }

    static async register(user: UserModel) {
        return await Api.post(`/auth/register`, {username: user.username, email: user.email, password: user.password});
    }

    static async getMe() {
        return await Api.get('/users/me');
    }

    static async logout() {
        return await Api.post('/auth/logout', {});
    }
} 