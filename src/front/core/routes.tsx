import React, {lazy, LazyExoticComponent, ReactNode} from 'react'
import {Redirect} from 'react-router-dom'

export type RouteType = { path: string, exact: boolean, component: LazyExoticComponent<() => any> }

export default {
    logged: [
        {
            path: '/',
            exact: true,
            component: lazy(() => import('@components/dashboard'))
        }, {
            path: '/:resource',
            exact: true,
            component: lazy(() => import('@containers/list'))
        }, {
            path: '/:resource/new',
            exact: true,
            component: lazy(() => import('@containers/create'))
        }, {
            path: '/:resource/:id',
            exact: true,
            component: lazy(() => import('@containers/edit'))
        }, {
            path: '/:resource/delete/:id',
            exact: true,
            component: lazy(() => import('@containers/delete'))
        }, {
            path: '*',
            component: () => <Redirect to='/'/>
        }
    ],
    rest: [
        {
            path: '/login',
            exact: true,
            component: lazy(() => import('@containers/login'))
        }, {
            path: '/register',
            exact: true,
            component: lazy(() => import('@containers/register'))
        }, {
            path: '*',
            component: () => <Redirect to='/login'/>
        }
    ]
} as { [key: string]: Array<RouteType> }

export type AllowedResourceType = { name: string, title: string, icon: ReactNode }

export const allowedResources = [
    {
        name: 'categories',
        title: 'Categories',
        icon: <svg viewBox="0 -52 512.00001 512">
            <path
                d="m0 113.292969h113.292969v-113.292969h-113.292969zm30.003906-83.289063h53.289063v53.289063h-53.289063zm0 0"/>
            <path
                d="m149.296875 0v113.292969h362.703125v-113.292969zm332.699219 83.292969h-302.695313v-53.289063h302.695313zm0 0"/>
            <path
                d="m0 260.300781h113.292969v-113.292969h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0"/>
            <path
                d="m149.296875 260.300781h362.703125v-113.292969h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0"/>
            <path
                d="m0 407.308594h113.292969v-113.296875h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0"/>
            <path
                d="m149.296875 407.308594h362.703125v-113.296875h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0"/>
        </svg>
    },{
        name: '404',
        title: 'empty',
        icon: <svg viewBox="0 -52 512.00001 512">
            <path
                d="m0 113.292969h113.292969v-113.292969h-113.292969zm30.003906-83.289063h53.289063v53.289063h-53.289063zm0 0"/>
            <path
                d="m149.296875 0v113.292969h362.703125v-113.292969zm332.699219 83.292969h-302.695313v-53.289063h302.695313zm0 0"/>
            <path
                d="m0 260.300781h113.292969v-113.292969h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0"/>
            <path
                d="m149.296875 260.300781h362.703125v-113.292969h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0"/>
            <path
                d="m0 407.308594h113.292969v-113.296875h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0"/>
            <path
                d="m149.296875 407.308594h362.703125v-113.296875h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0"/>
        </svg>
    },
] as Array<{ name: string, title: string, icon: ReactNode }>