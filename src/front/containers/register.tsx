import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import register from '@actions/registration'
import {Register} from '@components'

import '@components/auth-page.less'
import {AppStoreType} from "@reducers";

export default () => {
    const [user, changeUserInfo] = useState({email: '', firstname: '', lastname: '', password: ''})

    const dispatch = useDispatch()
    const {inProgress} = useSelector((store: AppStoreType) => store.registration)

    return <Register user={user} setInfo={(field: string, value: string) => changeUserInfo({...user, [field]: value})}
                     inProgress={inProgress} onRegister={() => dispatch(register(user))}/>
}