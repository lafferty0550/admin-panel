import UserAPI from '@api/user'
import history from '@core/history'
import notify, {ActionType as NotifyActionType} from '@actions/notification'
import {ThunkType} from '@actions/types'
import {UserType} from "@api/types";

export const REGISTER_PENDING = 'REGISTER_PENDING'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

type Type = typeof REGISTER_PENDING | typeof REGISTER_SUCCESS | typeof REGISTER_FAILURE
export type ActionType = {type: Type}

const createAction = (type: Type): ActionType => ({type})

export default (user: UserType): ThunkType<ActionType | NotifyActionType> => async dispatch => {
    dispatch(createAction(REGISTER_PENDING))

    try {
        const {success, msg} = await UserAPI.register(user)
        if (success) {
            dispatch(createAction(REGISTER_SUCCESS))
            history.push('/login')
            dispatch(notify(msg, 'success'))
        } else {
            dispatch(createAction(REGISTER_FAILURE))
            dispatch(notify(msg, 'danger'))
        }
    } catch (err) {
        dispatch(createAction(REGISTER_FAILURE))
        dispatch(notify(err.toString(), 'danger'))
    }
}