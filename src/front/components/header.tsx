import React, {MouseEvent} from 'react'
import {Link} from 'react-router-dom'

import {allowedResources} from '@core/routes'

import './header.less'

type PropsType = {
    loggedIn: boolean,
    onLogout: (e: MouseEvent<HTMLAnchorElement>) => void
}

export default (({loggedIn, onLogout}) => (
    <header>
        <nav>
            <input type='checkbox' id='checkbox-menu'/>
            <label htmlFor='checkbox-menu'>
                <div className='menu touch'>
                    <div className='menu__section'>
                        <Link className='logo menu__item' to='/'>FWA</Link>
                    </div>
                    <div className='menu__section'>
                        {allowedResources.map(({name, title}) => (
                            <Link to={`/${name}`} className='menu__item' key={name}>{title}</Link>
                        ))}
                    </div>
                    <div className='menu__section'>
                        {loggedIn ? (
                            <Link to='/login' className='menu__item' onClick={onLogout}>LogOut</Link>
                        ) : (
                            <Link to='/login' className='menu__item'>LogIn</Link>
                        )}
                    </div>
                </div>
                <span className='toggle'>☰</span>
            </label>
        </nav>
    </header>
)) as React.FC<PropsType>