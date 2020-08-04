import ResourceAPI from '@api/resource'
import history from '@core/history'
import notify, {ActionType as NotifyActionType} from '@actions/notification'
import {ThunkType} from '@actions/types'
import {ResourcesType} from '@api/types'

export const CUR_PENDING = 'CUR_PENDING'
export const CUR_SUCCESS = 'CUR_SUCCESS'
export const CUR_FAILURE = 'CUR_FAILURE'
export const SET_CURRENT = 'SET_CURRENT'

type Type = typeof CUR_PENDING | typeof CUR_SUCCESS | typeof CUR_FAILURE | typeof SET_CURRENT
type ActionType = { type: Type, resource: string, data?: ResourcesType }
export {ActionType as CurrentActionType}

const createAction = (type: Type, resource: string, data?: ResourcesType): ActionType => ({type, resource, data})

export const set_current = (item: ResourcesType): ThunkType<ActionType> => async dispatch => {
    dispatch(createAction(SET_CURRENT, undefined, item))
}

export default (name: string, id: string): ThunkType<ActionType | NotifyActionType> =>
    async dispatch => {
        dispatch(createAction(CUR_PENDING, name))

        try {
            const result = await ResourceAPI.getById(name, id)
            if (!result.success) {
                dispatch(createAction(CUR_FAILURE, name))
                history.push(`/${name}`)
                dispatch(notify(result.msg, 'danger'))
            } else
                dispatch(createAction(CUR_SUCCESS, name, result.data))
        } catch (err) {
            dispatch(createAction(CUR_FAILURE, name))
            dispatch(notify(err.toString(), 'danger'))
        }
    }