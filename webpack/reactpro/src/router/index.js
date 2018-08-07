import React from 'react';
import {
    HashRouter as Router,//- TODO 线上和本地用 BrowserRouter（/hash） ；本地tomcat测试用 HashRouter（#/hash）
    Route
} from 'react-router-dom';
import Loadable from 'react-loadable';

// import App from '../components/app';
// import Home from '../components/test_router/home';
// import About from '../components/test_router/about';
// import Topic from '../components/test_router/topic';
// import Changev from '../containers/test_input/inputv'

const Loading = () => <div className='loading'>Loading...</div>;

const App = Loadable({
    loader: () => import('../components/app'),
    loading: Loading,
});

const Home = Loadable({
    loader: () => import('../components/test_router/home'),
    loading: Loading,
});

const About = Loadable({
    loader: () => import('../components/test_router/about'),
    loading: Loading,
});

const Topic = Loadable({
    loader: () => import('../components/test_router/topic'),
    loading: Loading,
});

const Changev = Loadable({
    loader: () => import('../containers/test_input/inputv'),
    loading: Loading,
});

const setRouter = () => (
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/home" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topic}/>
            <Route path="/input" component={Changev}/>
        </div>
    </Router>
)

export default setRouter;