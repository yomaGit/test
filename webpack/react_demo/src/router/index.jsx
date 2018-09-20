import React from 'react';
import {HashRouter, Route} from 'react-router-dom'

import App from '../components/pages/app/App';
import rc from '../components/pages/router_color/index'
import color from '../components/pages/color/index'
import list from '../components/pages/list/index'

const RouterSet = () =>
    <HashRouter>
        <div className='router_main'>
            <Route exact path='/' component={App}/>
            <Route path='/app' component={App}/>
            <Route path='/router_color' component={rc}/>
            <Route path='/color' component={color}/>
            <Route path='/list' component={list}></Route>
        </div>
    </HashRouter>

export default RouterSet;