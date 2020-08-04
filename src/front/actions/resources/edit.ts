import ResourceAPI from '@api/resource'
import history from '@core/history'
import notify, {ActionType as NotifyActionType} from '@actions/notification'
import {ThunkType} from '@actions/types'
import {ChangingResourcesType} from '@api/types'

export const EDIT_PENDING = 'EDIT_PENDING'
export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_FAILURE = 'EDIT_FAILURE'

type Type = typeof EDIT_PENDING | typeof EDIT_SUCCESS | typeof EDIT_FAILURE
type ActionType = { type: Type }
export {ActionType as EditActionType}

const createAction = (type: Type): ActionType => ({type})

export default (
    name: string,
    id: string,
    changes: ChangingResourcesType
): ThunkType<ActionType | NotifyActionType> => async dispatch => {
    dispatch(createAction(EDIT_PENDING))

    try {
        const result = await ResourceAPI.edit(name, id, changes)
        if (!result.success) {
            dispatch(createAction(EDIT_FAILURE))
            dispatch(notify(result.msg, 'danger'))
        } else {
            dispatch(createAction(EDIT_SUCCESS))
            history.push(`/${name}/`)
            dispatch(notify(result.msg, 'success'))
        }
    } catch (err) {
        dispatch(createAction(EDIT_FAILURE))
        dispatch(notify(err.toString(), 'danger'))
    }
}