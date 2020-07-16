import React, {useState} from 'react'
import {PopUp} from '../PopUps/PopUpStyles'
import Overlay from '../PopUps/Overlay'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {FlexDirectionRow, Input, TextArea} from '../GeneralStyles'

function ReviewForm({chef, customer, setReviewVisibility}) {

    const [ratingValue, setRatingValue] = useState('')
    const [ratingDescription, setRatingDescription] = useState('')

    const submitReview = async (event) => {
        event.preventDefault()
        const reviewData = {
            chef: chef,
            ratingValue: ratingValue,
            ratingDescription: ratingDescription,
            username: customer
        }
        try{
            let writeReview = await axios.post('/api/post/add-review', reviewData)
            console.log(writeReview)
        }catch(error){
            console.log(error)
        }



        setReviewVisibility(false)
     }

    return (
        <div>
            <PopUp>
                <form onSubmit={submitReview} style={{display: 'flex', flexDirection: 'column'}}>
                    <FlexDirectionRow><h2>Write a Review</h2></FlexDirectionRow>
                    <label htmlFor="star-rating">Rating</label>
                    <Input type="number" id="star-rating" min="1" max="5" step=".1" value = {ratingValue} onChange = {(e) => setRatingValue(e.target.value)} required/>
                    <label htmlFor="rating-description" style={{marginTop: '10px'}}>Describe Experience</label>
                    <TextArea onChange = {e => setRatingDescription(e.target.value)} id="rating-description" required></TextArea>
                    <Button type='submit' style={{marginTop: '10px'}}>Submit</Button>
                </form>
            </PopUp>
            <Overlay setVisibility={setReviewVisibility}/>
        </div>
    )
}

export default ReviewForm
