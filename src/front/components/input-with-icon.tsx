import React, {ChangeEvent} from 'react'

import './input-with-icon.less'

type PropsType = {
    value: string,
    icon: any,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default (({placeholder, value, icon, type, onChange}) => {
    return (
        <div className='input-icon-container'>
            <div>{icon}</div>
            <input placeholder={placeholder} value={value} onChange={onChange} type={type}/>
        </div>
    )
}) as React.FC<PropsType>