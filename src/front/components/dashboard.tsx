import React from 'react'

import ItemCard from './item-card'

import {allowedResources} from '@core/routes'

import './dashboard.less'

export default () => {
    return (
        <div className='dashboard'>
            {allowedResources.map((resource) => <ItemCard resource={resource} key={resource.name}/>)}
        </div>
    )
}