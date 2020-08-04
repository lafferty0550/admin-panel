import {ThunkType} from "@actions/types";

export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'
export const POP_NOTIFICATION = 'POP_NOTIFICATION'
export const SET_ROOT = 'SET_ROOT'

type Type = typeof PUSH_NOTIFICATION | typeof POP_NOTIFICATION | typeof SET_ROOT
export type MessageType = { message: string, type: 'danger' | 'success' | 'info', timestamp: number }
export type ActionType = { type: Type, data?: MessageType, root?: HTMLElement }

const createAction = (type: Type, data?: MessageType, root?: HTMLElement) => ({type, data, root})

export default (message: string, type: 'danger' | 'success' | 'info'): ThunkType<ActionType> => dispatch => {
    dispatch(createAction(PUSH_NOTIFICATION, {message, type, timestamp: (new Date()).getTime()}))
    setTimeout(() => {
        dispatch(createAction(POP_NOTIFICATION))
    }, 8000)
}

export const set_root = (root: HTMLElement | null): ThunkType<ActionType> => dispatch =>
    dispatch(createAction(SET_ROOT, undefined, root))