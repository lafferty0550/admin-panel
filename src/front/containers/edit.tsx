import React, {useEffect, useState, ChangeEvent} from 'react'
import {useParams} from 'react-router'
import {useSelector, useDispatch} from 'react-redux'

import {get_data, get_data_by_id, edit_data} from '@actions/resources'
import notify from '@actions/notification'
import ResourceAPI from '@api/resource'
import {Edit, LoadingWrapper} from '@components'
import {AppStoreType} from '@reducers'

export default () => {
    const {current, edit} = useSelector(({resources: {current, edit}}: AppStoreType) => ({current, edit}))
    const {resource, id} = useParams()
    const dispatch = useDispatch()

    const [changedTitle, setTitle] = useState(undefined)
    const [changedImage, setImage] = useState(undefined)
    const [imageLoading, setLoading] = useState(false)

    useEffect(() => {
        if (!Object.keys(current.data).length)
            dispatch(get_data_by_id(resource, id))
    }, [])

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
        if (!changedTitle && !changedImage)
            dispatch(notify('Вы не внесли изменений', 'info'))
        else {
            await dispatch(edit_data(resource, id, {title: changedTitle, image: changedImage}))
            dispatch(get_data(resource))
        }
    }

    return (
        <LoadingWrapper spinner={current.inProgress || edit.inProgress} show={current.success}>
            <Edit imageLoading={imageLoading} data={(current as any).data}
                  changes={{title: changedTitle, image: changedImage}}
                  onSave={onSave} uploadImage={uploadImage} setTitle={setTitle}/>
        </LoadingWrapper>
    )
}