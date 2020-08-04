import ResourceAPI from '@api/resource'
import history from '@core/history'
import notify, {ActionType as NotifyActionType} from '@actions/notification'
import {ThunkType} from '@actions/types'

export const CREATE_PENDING = 'CREATE_PENDING'
export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_FAILURE = 'CREATE_FAILURE'

type Type = typeof CREATE_PENDING | typeof CREATE_SUCCESS | typeof CREATE_FAILURE
type ActionType = { type: Type }
export {ActionType as CreateActionType}

const createAction = (type: Type): ActionType => ({type})

export default (
    name: string,
    title: string,
    image: string
): ThunkType<ActionType | NotifyActionType> => async dispatch => {
    dispatch(createAction(CREATE_PENDING))

    try {
        const result = await ResourceAPI.create(name, title, image)
        if (!result.success) {
            dispatch(createAction(CREATE_FAILURE))
            dispatch(notify(result.msg, 'danger'))
        } else {
            dispatch(createAction(CREATE_SUCCESS))
            history.push(`/${name}/`)
            dispatch(notify(result.msg, 'success'))
        }
    } catch (err) {
        dispatch(createAction(CREATE_FAILURE))
        dispatch(notify(err.toString(), 'danger'))
    }
}