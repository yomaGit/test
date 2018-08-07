import React,{Component} from "react";

class input extends Component {

    render() {
        let clickfun = this.props.clickfun;
        let saveval=this.props.inputval;
        let inputv = '';
        return (
            <div>
                <input type="text" ref={val =>
                    inputv = val
                }/>
                <button onClick={()=>clickfun(inputv.value)}>确定</button>
                <br />
                <div>输入值为：{saveval}</div>
            </div>
        )
    }

}

export default input;