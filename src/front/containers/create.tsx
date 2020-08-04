import React, {ChangeEvent, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {Create, LoadingWrapper} from '@components'
import ResourceAPI from '@api/resource'
import notify from '@actions/notification'
import {get_data, create_data} from '@actions/resources'
import {AppStoreType} from '@reducers'

export default () => {
    const create = useSelector(({resources: {create}}: AppStoreType) => create)
    const {resource} = useParams()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [imageLoading, setLoading] = useState(false)

    const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        try {
            const file = await ResourceAPI.uploadImage(e.target.files[0])
            setImage(file.secure_url)
            dispatch(notify('Картинка успешно загружена!', 'info'))
        } catch (err) {
            dispatch(notify('Картинка не была загружена!', 'danger'))
        }
        setLoading(false)
    }

    const onSave = async () => {
        if (!title && !image)
            dispatch(notify('Не все поля введены!', 'danger'))
        else {
            await dispatch(create_data(resource, title, image))
            dispatch(get_data(resource))
        }
    }

    return (
        <LoadingWrapper spinner={create.inProgress} show={create.success}>
            <Create title={title} setTitle={setTitle} image={image} imageLoading={imageLoading}
                    uploadImage={uploadImage} onSave={onSave}/>
        </LoadingWrapper>
    )
}