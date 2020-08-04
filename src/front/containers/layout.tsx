import React, {useEffect} from 'react'
import {Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import routes, {RouteType} from '@core/routes'
import {set_root} from '@actions/notification'
import {Layout} from '@components'
import {AppStoreType} from '@reducers'

export default () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(set_root(document.getElementById('alert-root')))
    }, [])

    const {loggedIn} = useSelector((store: AppStoreType) => store.authorization)
    const renderRoutes = (routes: Array<RouteType>) => routes.map((route: RouteType) =>
        <Route path={route.path} exact={route.exact} component={route.component} key={route.path}/>
    )

    return (
        <Layout>
            {renderRoutes(loggedIn ? routes.logged : routes.rest)}
        </Layout>
    )
}