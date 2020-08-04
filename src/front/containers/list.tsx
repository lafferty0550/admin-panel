import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, Redirect} from 'react-router'

import {AppStoreType} from '@reducers'
import {get_data, set_current} from '@actions/resources'
import {List, LoadingWrapper} from '@components'
import {allowedResources} from '@core/routes'
import {ResourcesType} from '@api/types'

export default () => {
    const {resource} = useParams()

    if (!allowedResources.map(({name}) => (name === resource)).includes(true))
        return <Redirect to='/'/>

    const {inProgress, success, data} = useSelector((store: AppStoreType) => store.resources.list[resource])
    const dispatch = useDispatch()

    useEffect(() => {
        if (!data.length)
            dispatch(get_data(resource))
    }, [resource])

    return (
        <LoadingWrapper spinner={inProgress} show={success}>
            <List resource={resource} data={data}
                  setCurrent={(item: ResourcesType) => dispatch(set_current(item))}/>
        </LoadingWrapper>
    )
}