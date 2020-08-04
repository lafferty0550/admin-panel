import {combineReducers} from 'redux'

import registrationReducer from './registration'
import authorizationReducer from './authorization'

import {
    resourcesReducer,
    currentReducer,
    editReducer,
    deleteReducer,
    createReducer
} from '@reducers/resources'

import notificationReducer from './notification'

const rootReducer = combineReducers({
    registration: registrationReducer,
    authorization: authorizationReducer,
    notification: notificationReducer,

    resources: combineReducers({
        list: resourcesReducer,
        current: currentReducer,
        edit: editReducer,
        remove: deleteReducer,
        create: createReducer
    })
})

type RootReducerType = typeof rootReducer
export type AppStoreType = ReturnType<RootReducerType>

export default rootReducer