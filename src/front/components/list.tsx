import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {ResourcesType} from '@api/types'
import {Button} from '@components/index'

import './list.less'

type PropsType = {
    resource: string,
    data: Array<ResourcesType>,
    setCurrent: (item: ResourcesType) => void
}

export default (({resource, data, setCurrent}) => {
    return (
        <div className='list-container'>
            <h1>Список категорий</h1>
            <Button type='primary'><Link to={`/${resource}/new`}>Создать категорию</Link></Button>
            <div className='list'>
                {data.map((item: ResourcesType) => (
                    <div className='list-item' key={item._id}>
                        <img src={item.image} alt='img'/>
                        <div>
                            <Link to={`/${resource}/${item._id}`} className='list-item__icon' onClick={() => setCurrent(item)}>
                                <FontAwesomeIcon color='blue' icon={faEdit}/>
                            </Link>
                            <h2>{item.title}</h2>
                            <Link to={`/${resource}/delete/${item._id}`} className='list-item__icon' onClick={() => setCurrent(item)}>
                                <FontAwesomeIcon color='red' icon={faTrashAlt}/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}) as React.FC<PropsType>