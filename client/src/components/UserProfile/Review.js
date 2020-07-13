import React from 'react'
import StarRatings from 'react-star-ratings';
import { ReviewDescription, ReviewContainer, ReviewCustomer } from './UserProfileStyles';

function Review({rating, description, username}) {
    return (
        <ReviewContainer>
            <ReviewCustomer>{username}</ReviewCustomer>
            <StarRatings rating={parseFloat(rating)} starDimension="20px" starRatedColor="gold" />
            <ReviewDescription>{description}</ReviewDescription>
        </ReviewContainer>
    )
}

export default Review
