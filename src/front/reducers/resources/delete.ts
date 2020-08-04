import {
    DELETE_PENDING,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    DeleteActionType
} from '@actions/resources/delete'

const initialState = {
    inProgress: false,
    success: false
}

export type StateType = typeof initialState

export default (state: StateType = initialState, action: DeleteActionType) => {
    switch (action.type) {
        case DELETE_PENDING:
            return {
                inProgress: true,
                success: false
            }
        case DELETE_SUCCESS:
            return {
                inProgress: false,
                success: true
            }
        case DELETE_FAILURE:
            return {
                inProgress: false,
                success: false
            }
        default:
            return state
    }
}