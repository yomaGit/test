import React from "react";
import Color from './Color'

import '../../css/ui/Colorlist.scss'

const Colorlist=({colors=[],onRatColor=f=>f,onRemove=f=>f})=>
    <div className="color-list">
        {(colors.length===0) ?
            <p>no colors</p>:
            colors.map((color)=>
                <Color key={color.id} onRatColor={(rat)=>onRatColor(color.id,rat)} onRemove={()=>onRemove(color.id)} {...color}/>
            )
        }
    </div>

export default Colorlist;