import React, {useEffect} from 'react'
import {useParams} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'

import {Delete, LoadingWrapper} from '@components'
import {get_data, get_data_by_id, delete_data} from '@actions/resources'
import history from '@core/history'
import {AppStoreType} from '@reducers'

export default () => {
    const {current, remove} = useSelector(({resources: {current, remove}}: AppStoreType) => ({current, remove}))
    // TODO: handle remove state
    const dispatch = useDispatch()
    const {resource, id} = useParams()

    useEffect(() => {
        if (!Object.keys(current.data).length)
            dispatch(get_data_by_id(resource, id))
    }, [])

    const handleDelete = async () => {
        await dispatch(delete_data(resource, id))
        dispatch(get_data(resource))

    }
    const handleNotDelete = () => {
        history.goBack()
        dispatch(get_data(resource))
    }

    return (
        <LoadingWrapper spinner={current.inProgress || current.inProgress} show={current.success}>
            <Delete title={(current.data as any).title} handleDelete={handleDelete} handleNotDelete={handleNotDelete}/>
        </LoadingWrapper>
    )
}