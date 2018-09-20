import PropTypes from "prop-types";
import React from "react";

import Star from './Star'
import '../../css/ui/StarRating.scss'

const StarRating=({totalStars=5,starsSelected=0,onRatColor=f=>f})=>
    <div className='star-rating'>
        {[...Array(totalStars)].map((n,i)=>
            <Star key={i} selected={i<starsSelected} onClick={()=>onRatColor(i+1)} />
        )}
    </div>

StarRating.propTypes={
    totalStars:PropTypes.number,
    starsSelected:PropTypes.number,
    onRatColor:PropTypes.func
}

export default StarRating;