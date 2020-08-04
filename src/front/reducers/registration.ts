import {
    REGISTER_PENDING,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    ActionType
} from '@actions/registration'

const initialState = {
    inProgress: false
}

export type StateType = typeof initialState

export default (state: StateType = initialState, action: ActionType) => {
    switch (action.type) {
        case REGISTER_PENDING:
            return {inProgress: true}
        case REGISTER_SUCCESS:
            return {inProgress: false}
        case REGISTER_FAILURE:
            return {inProgress: false}
        default:
            return state
    }
}