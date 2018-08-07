import React,{ Component } from 'react';
import ReactDOM,{ render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers/index'

// import registerServiceWorker from './other/registerServiceWorker';

import SetRouter from './router/index'

let store = createStore(todoApp)

render(
    <Provider store={store}>
        <SetRouter />
    </Provider>,
    document.getElementById('root')
)

// registerServiceWorker();//- https下缓存文件

//- test start

ReactDOM.render(
    <h1>Hello，react</h1>,
    document.getElementById('test0')
)

function renderfun(num) {
    return num++;
}

const element = (
    <h1>文字测试，{renderfun(1)}</h1>
)
ReactDOM.render(
    element,
    document.getElementById('test1')
)

const element0 = (
    <div>
        <p>第一行</p>
        <p>第二行</p>
    </div>
)
ReactDOM.render(
    element0,
    document.getElementById('test2')
)

function Welcome(props) {
    return <h1>传入参数 {props.name}</h1>
}

function List() {
    return (
        <div>
            <Welcome name='sara'/>
            <Welcome name='ben'/>
            <Welcome name='linda'/>
        </div>
    )
}

ReactDOM.render(
    <List/>,
    document.getElementById('test3')
)

class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.timeerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timeerID);
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <h1>时间计时：{this.state.date.toLocaleTimeString()}</h1>
        )
    }

}

ReactDOM.render(
    <Clock/>,
    document.getElementById('test4')
)

class Testfundy extends Component {

    testfun = () => {
        alert("test fun");
    }

    render() {
        return (
            <p onClick={this.testfun}>点击弹出 ‘test fun’</p>
        )
    }

}

ReactDOM.render(
    <Testfundy/>,
    document.getElementById('test5')
)

class Inputtem extends Component {

    constructor(props) {
        super(props);
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(e) {
        this.props.changefun(e.target.value);
    }

    render() {
        let inval = this.props.ival;
        let type = this.props.itype;
        let sv = type === 'val' ? '原始值' : '原始值*2';
        return (
            <div>
                显示为{sv}
                <input type="text" value={inval} onChange={this.inputChange}/>
            </div>
        )
    }
}

class Inputtest extends Component {

    constructor(props) {
        super(props);
        let that = this;

        that.state = {
            type: 'val',
            val: ''
        }

        that.changenumfun = that.changenumfun.bind(this);
        that.changenumfunj = that.changenumfunj.bind(this);
    }

    changenumfun(ival) {
        this.setState({
            type: 'val',
            val: ival
        })
    }

    changenumfunj(ival) {
        this.setState({
            type: 'valj',
            val: ival
        })
    }

    render() {
        let type = this.state.type;
        let val = this.state.val;
        let inputnum = type === 'val' ? val : val / 2;
        let inputnumj = type === 'valj' ? val : val * 2;
        return (
            <div>
                <Inputtem itype='val' ival={inputnum} changefun={this.changenumfun}/>
                <Inputtem itype='valj' ival={inputnumj} changefun={this.changenumfunj}/>
            </div>
        )
    }

}

ReactDOM.render(
    <Inputtest/>,
    document.getElementById('test6')
)


//- test end
