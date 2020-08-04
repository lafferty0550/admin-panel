import React from 'react'
import {Link} from 'react-router-dom'

import {AllowedResourceType} from '@core/routes'

import './item-card.less'

type PropsType = {
    resource: AllowedResourceType
}

export default (({resource}) => (
    <Link to={resource.name}><div className='item-card'>
        {resource.icon}
        <div>{resource.title}</div>
    </div></Link>
)) as React.FC<PropsType>