import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'

import history from '@core/history'
import {Layout} from '@containers'
import store from '@core/store'

import './index.less'

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <Layout/>
        </Provider>
    </Router>,
    document.querySelector('#root')
);