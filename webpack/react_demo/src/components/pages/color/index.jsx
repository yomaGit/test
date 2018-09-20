import connect from "react-redux/es/connect/connect";
import {addColor} from "../../../redux/colors";
import React, {Component} from "react";
import {Colors, NewColor} from "../../containers";

class Color extends Component{

    componentWillMount(){
        console.log('componentWillMount 初始化dom渲染之前');
    }

    componentDidMount(){
        this.props.onResetColor('ajax0','#345678');
        console.log('componentDidMount 初始化dom渲染之后');
    }

    componentWillUnmount(){
        console.log('componentWillUnmount 组件销毁了');
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps 新的属性被传递给了组件后');
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('shouldComponentUpdate 更新生命周期的门卫，可以通过只允许执行必须的更新来改进性能');

        return true;
    }

    componentWillUpdate(){
        console.log('componentWillUpdate 组件更新之前')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate 组件更新之后')
    }

    render() {
        return (
            <div className="Color">
                <NewColor />
                <Colors />
            </div>
        )
    }
}

const color=connect(
    null,
    dispatch=>
        ({
            onResetColor(title,color){
                new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve();
                    },1000)
                }).then(()=>{
                    console.log("模拟ajax 1s 后添加颜色");
                    dispatch(addColor(title,color))
                })
            }
        })
)(Color)

export default color;