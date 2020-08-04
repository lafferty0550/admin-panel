import {UserType} from "@api/types";

export default class {
    static register(user: UserType) {
        return fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(res => res.json())
    }

    static login(email: string, password: string) {
        return fetch('/api/auth/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('refreshToken', res.data.refreshToken)
                }
                return res
            })
    }

    static refreshToken() {
        return fetch('/api/auth/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refreshToken: localStorage.getItem('refreshToken')})
        })
            .then(res => res.json())
            .then(res => {
                if (res.success)
                    localStorage.setItem('token', res.data.token)
                return res
            })
    }

    static logout() {
        localStorage.removeItem('token')
    }
}