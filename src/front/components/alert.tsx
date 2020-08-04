import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './alert.less'

type MessageType = {
    type: 'danger' | 'info' | 'success',
    message: string,
    timestamp: number
}

type PropsType = {
    messages: Array<MessageType>,
    root: HTMLElement | null
}

export default (({messages, root}) => root && ReactDOM.createPortal(
    <div className='alert'>
        {messages.map(({timestamp, type, message}) => (
            <div key={timestamp} className={type}>
                {message}
            </div>
        ))}
    </div>,
    root
)) as React.FC<PropsType>