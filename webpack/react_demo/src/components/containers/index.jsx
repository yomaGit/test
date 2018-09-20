import {connect} from 'react-redux';
import AddColorForm from '../ui/AddColorForm'
import Colorlist from '../ui/Colorlist';
import {addColor,rateColor,removeColor} from "../../redux/colors";

export const NewColor=connect(
    null,
    dispatch=>
        ({
            onNewColor(title,color){

                setTimeout(()=>{
                    console.log(`300ms后执行添加，可以加ajax`)
                    dispatch(addColor(title,color))
                },300)
            }
        })
)(AddColorForm)

export const Colors=connect(
    state=>
        ({
            colors:[...state.colors]
        }),
    dispatch=>
        ({
            onRatColor(id,color){
                dispatch(rateColor(id,color))
            },
            onRemove(id){
                dispatch(removeColor(id))
            }
        })
)(Colorlist)