require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';

// import registerServiceWorker from './other/registerServiceWorker';

import RouterSet from './router/index'

import {storeFactory} from './redux'
const store = storeFactory()

ReactDOM.render(
    <Provider store={store}>
       <RouterSet />
    </Provider>
    , document.getElementById('root'));

// registerServiceWorker();
