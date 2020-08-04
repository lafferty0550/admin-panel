import UserAPI from '@api/user'
import history from '@core/history'
import notify, {ActionType as NotifyActionType} from '@actions/notification'
import {ThunkType} from '@actions/types'
import {UserType} from '@api/types'

export const LOGIN_PENDING = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT = 'LOGOUT'

type Type = typeof LOGIN_PENDING | typeof LOGIN_SUCCESS | typeof LOGIN_FAILURE | typeof LOGOUT
export type ActionType = {type: Type, user: UserType}

const createAction = (type: Type, user?: UserType) : ActionType => ({type, user})

export const login = (email: string, password: string): ThunkType<ActionType | NotifyActionType> => async dispatch => {
    dispatch(createAction(LOGIN_PENDING))

    try {
        const {success, msg, user} = await UserAPI.login(email, password)
        if (!success) {
            dispatch(createAction(LOGIN_FAILURE))
            dispatch(notify(msg, 'danger'))
        } else {
            dispatch(createAction(LOGIN_SUCCESS, user))
            history.push('/')
            dispatch(notify(msg, 'success'))
        }
    } catch (err) {
        dispatch(createAction(LOGIN_FAILURE))
        dispatch(notify(err.toString(), 'danger'))
    }
}

export const logout = () => {
    UserAPI.logout()
    return {type: LOGOUT}
}