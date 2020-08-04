import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {login} from '@actions/authorization'
import {Login} from '@components'
import {AppStoreType} from '@reducers'

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const {inProgress} = useSelector((store: AppStoreType) => store.authorization)

    return <Login inProgress={inProgress}
                  email={email} password={password}
                  setEmail={setEmail} setPassword={setPassword}
                  onLogin={() => dispatch(login(email, password))}/>
}