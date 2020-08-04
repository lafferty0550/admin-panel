import React, {MouseEvent} from 'react'

import {Button} from '@components'

import './delete.less'

type PropsType = {
    title: string,
    handleDelete: (e: MouseEvent<HTMLButtonElement>) => void,
    handleNotDelete: (e: MouseEvent<HTMLButtonElement>) => void
}

export default (({title, handleDelete, handleNotDelete}) => (
    <div className='delete-page'>
        <h1>Вы действительно хотите удалить "{title}"?</h1>
        <div>
            <Button type='primary' onClick={handleDelete}>Да</Button>
            <Button type='secondary' onClick={handleNotDelete}>Нет</Button>
        </div>
    </div>
)) as React.FC<PropsType>