import {
    FETCH_PENDING,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    ResourceActionType
} from '@actions/resources'
import {ResourcesType} from '@api/types'

import {allowedResources} from '@core/routes'

type ResourceStateType = {
    inProgress: boolean,
    success: boolean,
    data: Array<ResourcesType>
}

const initialState = {} as { [key: string]: ResourceStateType }

allowedResources.forEach(({name}) => {
    initialState[name] = {
        inProgress: false,
        success: false,
        data: []
    } as ResourceStateType
})

export type StateType = typeof initialState

export default (state: StateType = initialState, action: ResourceActionType) => {
    switch (action.type) {
        case FETCH_PENDING:
            return {
                ...state,
                [action.resource]: {
                    ...state[action.resource],
                    inProgress: true
                }
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                [action.resource]: {
                    inProgress: false,
                    success: true,
                    data: action.data
                }
            }
        case FETCH_FAILURE:
            return {
                ...state,
                [action.resource]: {
                    inProgress: false,
                    success: false,
                    data: []
                }
            }
        default:
            return state
    }
}