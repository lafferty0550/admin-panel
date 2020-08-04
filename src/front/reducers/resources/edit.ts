import {
    EDIT_PENDING,
    EDIT_SUCCESS,
    EDIT_FAILURE,
    EditActionType
} from '@actions/resources/edit'

const initialState = {
    inProgress: false,
    success: false
}

export type StateType = typeof initialState

export default (state: StateType = initialState, action: EditActionType) => {
    switch (action.type) {
        case EDIT_PENDING:
            return {
                inProgress: true,
                success: false
            }
        case EDIT_SUCCESS:
            return {
                inProgress: false,
                success: true
            }
        case EDIT_FAILURE:
            return {
                inProgress: false,
                success: false
            }
        default:
            return state
    }
}