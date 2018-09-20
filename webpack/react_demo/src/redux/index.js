import {v4} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";

import {colors} from "./colors";

//- store 中间件
const initState={
    colors:[
        {
            id:v4(),
            title:'default0',
            color:'#ffaa00',
            rating:5
        },
        {
            id:v4(),
            title:'default1',
            color:'#00aa00',
            rating:3
        }
    ]
}
let console = window.console

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

export const storeFactory = (initialState=initState) =>
    applyMiddleware(logger)(createStore)(
        combineReducers({colors}),
        initialState
    )
