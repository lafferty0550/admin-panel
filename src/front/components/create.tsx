import * as React from 'react'

import {Button, LoadingWrapper} from '@components'

import './create.less'
import {ChangingResourcesType, ResourcesType} from "@api/types";
import {ChangeEvent, MouseEvent} from "react";

type PropsType = {
    title: string,
    image: string,
    imageLoading: boolean,
    setTitle: (value: string) => void,
    onSave: (e: MouseEvent<HTMLButtonElement>) => void,
    uploadImage: (e: ChangeEvent<HTMLInputElement>) => void
}

export default (({title, image, setTitle, uploadImage, imageLoading, onSave}) => {
    return (
        <div className='create-page'>
            <h2>Создание категории</h2>
            <div className='create-page-form'>
                <div>
                    <span>Наименование:</span>
                    <input value={title} onChange={e => setTitle(e.target.value)}/>
                    <span>Изображение:</span>
                    <input type='file' onChange={uploadImage}/>
                </div>
                <LoadingWrapper spinner={imageLoading}>
                    {image && <img src={image} alt='img'/>}
                    <Button onClick={onSave}>Сохранить</Button>
                </LoadingWrapper>
            </div>
        </div>
    )
}) as React.FC<PropsType>