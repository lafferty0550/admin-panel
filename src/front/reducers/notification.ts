import {
    PUSH_NOTIFICATION,
    POP_NOTIFICATION,
    SET_ROOT,
    ActionType,
    MessageType
} from '@actions/notification'

const initialState = {
    messages: [] as Array<MessageType>,
    root: null as HTMLElement
}

export type StateType = typeof initialState

export default (state: StateType = initialState, action: ActionType) => {
    switch (action.type) {
        case PUSH_NOTIFICATION:
            return {
                ...state,
                messages: [...state.messages, action.data]
            }
        case POP_NOTIFICATION:
            return {
                ...state,
                messages: state.messages.slice(1)
            }
        case SET_ROOT:
            return {
                ...state,
                root: action.root
            }
        default:
            return state
    }
}