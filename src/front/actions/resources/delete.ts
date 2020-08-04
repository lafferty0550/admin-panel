import ResourceAPI from '@api/resource'
import history from '@core/history'
import notify, {ActionType as NotifyActionType} from '@actions/notification'
import {ThunkType} from '@actions/types'

export const DELETE_PENDING = 'DELETE_PENDING'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'

type Type = typeof DELETE_PENDING | typeof DELETE_SUCCESS | typeof DELETE_FAILURE
type ActionType = { type: Type }
export {ActionType as DeleteActionType}

const createAction = (type: Type) => ({type})

export default (name: string, id: string): ThunkType<ActionType | NotifyActionType> => async dispatch => {
    dispatch(createAction(DELETE_PENDING))

    try {
        const result = await ResourceAPI.delete(name, id)
        if (!result.success) {
            dispatch(createAction(DELETE_FAILURE))
            dispatch(notify(result.msg, 'danger'))
        } else {
            dispatch(createAction(DELETE_SUCCESS))
            history.push(`/${name}/`)
            dispatch(notify(result.msg, 'success'))
        }
    } catch (err) {
        dispatch(createAction(DELETE_FAILURE))
        dispatch(notify(err.toString(), 'danger'))
    }
}