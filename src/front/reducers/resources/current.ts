import {
    CUR_PENDING,
    CUR_SUCCESS,
    CUR_FAILURE,
    SET_CURRENT,
    CurrentActionType
} from '@actions/resources/current'
import {ResourcesType} from '@api/types'

const initialState = {
    inProgress: false,
    success: false,
    data: {} as ResourcesType
}
export type StateType = typeof initialState

export default (state: StateType = initialState, action: CurrentActionType) => {
    switch (action.type) {
        case CUR_PENDING:
            return {
                inProgress: true,
                success: false,
                data: {}
            }
        case CUR_SUCCESS:
        case SET_CURRENT:
            return {
                inProgress: false,
                success: true,
                data: action.data
            }
        case CUR_FAILURE:
            return {
                inProgress: false,
                success: false,
                data: {}
            }
        default:
            return state
    }
}