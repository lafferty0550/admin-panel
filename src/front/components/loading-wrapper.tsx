import React, {ReactNode} from 'react'

import {Spinner} from '@components'

type PropsType = {
    spinner: boolean,
    show?: boolean,
    children: ReactNode
}

export default (({spinner = true, show = true, children}) => {
    return spinner ? <Spinner/> : show && children
}) as React.FC<PropsType>