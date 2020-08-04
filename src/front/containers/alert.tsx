import React from 'react'
import {useSelector} from 'react-redux'

import {Alert} from '@components'
import {AppStoreType} from '@reducers'

export default () => {
    const {messages, root} = useSelector((store: AppStoreType) => store.notification)
    return <Alert messages={messages} root={root}/>
}