import jwt from 'jsonwebtoken'

import UserAPI from '@api/user'
import {logout} from '@actions/authorization'
import store from '@core/store'

export const authorized_fetch = async (uri: string, config: any = {}) => {
    const token = localStorage.getItem('token')

    const decoded: any = jwt.decode(token)
    decoded.exp = decoded.exp * 1000 - 60000 // refresh the token a minute early to avoid latency issues
    if (Date.now() >= decoded.exp) {
        const res = await UserAPI.refreshToken()
        if (!res.success)
            store.dispatch(logout())
    }

    return fetch(uri, {
        ...config,
        headers: {
            'x-access-token': localStorage.getItem('token'),
            ...(config.headers || {}),
        }
    })
}