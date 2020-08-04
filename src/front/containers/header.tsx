import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {logout} from '@actions/authorization'
import {Header} from '@components'
import {AppStoreType} from '@reducers'

export default () => {
    const {loggedIn} = useSelector((store: AppStoreType) => store.authorization)
    const dispatch = useDispatch()

    return <Header loggedIn={loggedIn} onLogout={() => dispatch(logout())}/>
}