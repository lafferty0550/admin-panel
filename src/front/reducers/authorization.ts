import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    ActionType
} from '@actions/authorization'

const initialState = {
    inProgress: false,
    /*If token is not valid (user added it manually) then server won't allowed
                    us to access to resources (except home page)*/
    loggedIn: !!localStorage.getItem('token'),
    user: {}
}

export type StateType = typeof initialState

export default (state: StateType = initialState, action: ActionType) => {
    switch (action.type) {
        case LOGIN_PENDING:
            return {
                ...state,
                inProgress: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                inProgress: false,
                loggedIn: true,
                user: action.user
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                inProgress: false
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false
            }
        default:
            return state
    }
}