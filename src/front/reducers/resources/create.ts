import {
    CREATE_PENDING,
    CREATE_SUCCESS,
    CREATE_FAILURE,
    CreateActionType
} from '@actions/resources/create'

const initialState = {
    inProgress: false,
    success: false
}

export type StateType = typeof initialState

export default (state: StateType = initialState, action: CreateActionType) => {
    switch (action.type) {
        case CREATE_PENDING:
            return {
                inProgress: true,
                success: false
            }
        case CREATE_SUCCESS:
            return {
                inProgress: false,
                success: true
            }
        case CREATE_FAILURE:
            return {
                inProgress: false,
                success: false
            }
        default:
            return state
    }
}