import React, {ChangeEvent, MouseEvent} from 'react'

import {LoadingWrapper, Button} from '@components'
import {ChangingResourcesType, ResourcesType} from '@api/types'

import './edit.less'

type PropsType = {
    data: ResourcesType,
    changes: ChangingResourcesType,
    imageLoading: boolean,
    onSave: (e: MouseEvent<HTMLButtonElement>) => void,
    uploadImage: (e: ChangeEvent<HTMLInputElement>) => void,
    setTitle: (value: string) => void
}

export default (({
                     data, changes,
                     imageLoading, onSave, uploadImage, setTitle
                 }) => {
    const title = changes.title !== undefined ? changes.title : data.title
    const image = changes.image !== undefined ? changes.image : data.image
    return (
        <div className='edit-page'>
            <h1>Редактирование категории "{data.title}"</h1>
            <div className='edit-page-form'>
                <div>
                    <span>Наименование:</span>
                    <input value={title} onChange={e => setTitle(e.target.value)}/>
                    <span>Изображение:</span>
                    <input type='file' onChange={uploadImage}/>
                </div>
                <LoadingWrapper spinner={imageLoading}>
                    <img src={image} alt='img'/>
                    <Button onClick={onSave}>Сохранить</Button>
                </LoadingWrapper>
            </div>
        </div>
    )
}) as React.FC<PropsType>