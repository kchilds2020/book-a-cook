import React from 'react'
import StarRatings from 'react-star-ratings';

function Review({rating, description, username}) {
    return (
        <div className= "review-container">
            <div className = "review-customer">{username}</div>
            <StarRatings rating={parseFloat(rating)} starDimension="20px" starRatedColor="gold" />
            <div className = "review-description">{description}</div>
        </div>
    )
}

export default Review
