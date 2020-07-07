import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import '../../styles/Home.css'

function CustomerOrder({title, qty, pending, completed, orderID, writeReviewClicked}) {
    const [isPending, setPending] = useState(pending)



    const confirmDelivery = async(event) => {
        event.preventDefault()

        try{
            await axios.post('/api/post/update-pending-order', {orderID: orderID})
            setPending(false)
        }catch(error){
            console.log(error)
        }
     }

     

    return (
        <>
        <tr>
            <td>{title}</td>
            <td>{qty}</td>
            <td>{!completed ? <>On Its Way!</> : <> {isPending ? <Button onClick={confirmDelivery}>Confirm Delivery</Button> : <Button variant="success" onClick={writeReviewClicked} id = {`${orderID}`}>Write a Review</Button>}</>}</td>
        </tr>
        
       
        </>
    )
}

export default CustomerOrder
