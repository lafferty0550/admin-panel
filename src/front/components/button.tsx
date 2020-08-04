import React, {ReactNode, MouseEvent} from 'react'

import './button.less'

type PropsType = {
    children: ReactNode,
    type?: 'primary' | 'secondary' | 'common',
    className?: string,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default (({children, type = 'common', onClick, className = ''}) => (
    <button onClick={onClick} className={`${className} btn btn-${type}`}>{children}</button>
)) as React.FC<PropsType>