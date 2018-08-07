import {connect} from 'react-redux'
import input from '../../components/test_input/input'
import {changeInputval} from '../../actions/test_input'

const mapStateToProps = state => {//-  Redux store state 映射到展示组件的 props
    return {
        inputval: state.inputval
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clickfun: val => {
            dispatch(changeInputval(val))
        }
    }
}

const inputval = connect(
    mapStateToProps,
    mapDispatchToProps
)(input)

export default inputval