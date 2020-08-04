import React, {ReactNode, Suspense} from 'react'
import {Switch} from 'react-router-dom'

import {Alert, Header} from '@containers'
import {Spinner} from '@components'

import './layout.less'

type PropsType = {
    children: ReactNode
}

export default (({children}) => (
    <div className='layout'>
        <Header/>
        <Suspense fallback={<Spinner/>}>
            <Switch>
                {children}
            </Switch>
        </Suspense>
        <Alert/>
    </div>
)) as React.FC<PropsType>