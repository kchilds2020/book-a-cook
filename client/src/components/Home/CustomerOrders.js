import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import CustomerOrder from './CustomerOrder'

function CustomerOrders({username}) {

    const [orders, setOrders] = useState([])
    const [reviewVisibility, setReviewVisibility] = useState(false)
    const [ratingValue, setRatingValue] = useState(5)
    const [ratingDescription, setRatingDescription] = useState('')
    const [reviewID, setReviewID] = useState('')

    useEffect(() => {
        let mounted = true
        if(username !== ''){
             //get all posts
             axios.get(`/api/get/customer-orders/${username}`)
             .then(response => {
                 if(mounted){
                    console.log('CUSTOMER ORDERS',response.data)
                    setOrders(response.data);
                }
             })
             return () => mounted = false
         }
     },[username])

     const submitReview = async (event) => {
        event.preventDefault()
        const reviewData = {
            orderID: reviewID,
            ratingValue: ratingValue,
            ratingDescription: ratingDescription
        }
        try{
            let writeReview = await axios.post('/api/post/add-review', reviewData)
            console.log(writeReview)
        }catch(error){
            console.log(error)
        }



        setReviewVisibility(false)
     }

     const writeReviewClicked = (event) => {
        event.preventDefault()
        console.log(event.target)
        setReviewID(event.target.id)
        setReviewVisibility(true)
     }

     const cancelReview = async(event) => {
        event.preventDefault()
        setRatingValue(5)
        setRatingDescription('')
        setReviewID('')
        setReviewVisibility(false)
    }
     

    return (
        <div className = "home-sec-container" >
            <div className="header">
                <h3><span className="post-num">{orders.length}</span> Open Orders.</h3>
            </div>
            <div className="profile-job-posts">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {orders.length > 0 ? orders.map((element, index) => 
                        <CustomerOrder key = {index} pending={element.pending} completed = {element.completed} title={element.menuItemTitle} qty={element.qty} orderID = {element._id} writeReviewClicked={writeReviewClicked}/>) : <></>} 
                    </tbody>     
                </Table>
                {reviewVisibility ? 
                    <form className = "review-form">
                        <label htmlFor="star-rating">Rating</label>
                        <input type="number" id="star-rating" min="1" max="5" step=".1" value = {ratingValue} onChange = {(e) => setRatingValue(e.target.value)} required/>
                        <label htmlFor="rating-description" style={{marginTop: '10px'}}>Describe Experience</label>
                        <textarea onChange = {e => setRatingDescription(e.target.value)} id="rating-description"></textarea>
                        <Button onClick={submitReview} style={{marginTop: '10px'}}>Submit</Button>
                        <Button onClick={cancelReview} className="cancel-review-btn">x</Button>
                    </form> : <></> }
            </div>
        </div>
    )
}

export default CustomerOrders
