import React from 'react';
import {HashRouter, Route} from 'react-router-dom'

import Loadable from 'react-loadable';

// import App from '../components/pages/app/App';
// import rc from '../components/pages/router_color/index'
// import color from '../components/pages/color/index'
// import list from '../components/pages/list/index'

const Loading = () => <div className='loading'>Loading...</div>;

const App=Loadable({
    loader: () => import('../components/pages/app/App'),
    loading: Loading,
})

const rc=Loadable({
    loader: () => import('../components/pages/router_color/index'),
    loading: Loading,
})

const color=Loadable({
    loader: () => import('../components/pages/color/index'),
    loading: Loading,
})

const list=Loadable({
    loader: () => import('../components/pages/list/index'),
    loading: Loading,
})


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