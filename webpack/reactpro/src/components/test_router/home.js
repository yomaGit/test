import React, { Component } from 'react';
import Inputval from '../../containers/test_input/inputv'

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            val:''
        }
        this.changeval=this.changeval.bind(this)
    }

    changeval(e){
        this.setState({
            val:e.target.value
        })
    }

    render() {
        return (
            <div>
                我是 home 页面
                <Inputval />
                <hr />
                <input type="text" onChange={this.changeval}/>
                <div>输入值为：{this.state.val}</div>
            </div>
        );
    }
}

export default Home;
