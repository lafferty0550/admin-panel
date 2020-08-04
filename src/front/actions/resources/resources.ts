import ResourceAPI from '@api/resource'
import notify, {ActionType as NotifyActionType} from '@actions/notification'
import {ThunkType} from '@actions/types'
import {ResourcesType} from '@api/types'

export const FETCH_PENDING = 'FETCH_PENDING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

type Type = typeof FETCH_PENDING | typeof FETCH_SUCCESS | typeof FETCH_FAILURE
type ActionType = { type: Type, resource: string, data: Array<ResourcesType> }
export {ActionType as ResourceActionType}

const createAction = (
    type: Type,
    resource: string,
    data?: Array<ResourcesType>
): ActionType => ({type, resource, data})

export default (name: string): ThunkType<ActionType | NotifyActionType> => async dispatch => {
    dispatch(createAction(FETCH_PENDING, name))
    try {
        const result = await ResourceAPI.get(name)
        if (!result.success) {
            dispatch(createAction(FETCH_FAILURE, name))
            dispatch(notify(result.msg, 'danger'))
        } else
            dispatch(createAction(FETCH_SUCCESS, name, result.data))
    } catch (err) {
        dispatch(createAction(FETCH_FAILURE, name))
        dispatch(notify(err.toString(), 'danger'))
    }
}