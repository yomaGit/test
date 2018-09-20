import React from "react";
import StarRating from './StarRating'

import '../../css/ui/Color.scss'

const Color=({title,color,rating=0,onRatColor=f=>f,onRemove=f=>f})=>
    <section className='color_l'>
        <div className="title">{title}</div>
        <button className="delete" onClick={onRemove}>×</button>
        <div className="color" style={{backgroundColor:color}}></div>
        <div className="star_l">
            <StarRating starsSelected={rating} onRatColor={onRatColor}/>
            <p>{rating} of 5 stars</p>
        </div>
    </section>

export default Color;