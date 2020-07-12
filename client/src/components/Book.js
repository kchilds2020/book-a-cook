import React, {useState} from 'react'
import '../styles/Book.css'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import {
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js';
import axios from 'axios';

function Book({eventTitle, pricePerPerson, peopleAmount, eventID, chef, cancel, setVisibility}) {
    const [cardName, setCardName] = useState('');
    const [isLoading, setLoading] = useState(false)


    const stripe = useStripe();
    const elements = useElements();
    const total = (parseInt(pricePerPerson) * peopleAmount).toFixed(2)

    const bookChef = async (event) => {
        event.preventDefault()
        //get client secret for specific item
        setLoading(true)
        const clientSecretResponse = await axios.get(`/secret/book-chef/${eventID}/book/${chef}`);
        const clientSecret = clientSecretResponse.data.client_secret
        //charge card
        const paymentResponse = await stripe.confirmCardPayment(`${clientSecret}`,{
            payment_method: {
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: `${cardName}` 
                }
            }
          });
          if(paymentResponse.error){
              alert(`Error! ${paymentResponse.error.message}`) 
          }else{

            

            try{

                const data = {
                    cook: chef,
                    postID: eventID
                }
                let confirmCookRes = await axios.post('/api/post/confirm-cook', data)
                console.log('paid!', paymentResponse, confirmCookRes)
                alert('Order has been placed!')
                setVisibility(false)
                setLoading(false)
            }
            catch (error){
                alert(`Try catch error: ${error}`)
            }
        }
    }

    return (
        
        <div className="book-container">

            <div className="billing-header">{eventTitle}</div>
            <div style={{textAlign: 'left', fontSize: '12px'}}>
                <div>Chef: {chef}</div>
                <div>Catering {peopleAmount} People</div>
                <div>${pricePerPerson} Per Person</div>
            </div>
            
            <form onSubmit={bookChef}>
                <div className="billing-header">Billing Info</div>
                <input type="text" className="input-container" placeholder="Name on Card" value={cardName} onChange={e => setCardName(e.target.value)} required/>
                <div className="card-element-container" >
                    <CardElement />
                </div>
            
                <div className="book-total" id="total-price">Total: ${total}</div>
                <div className="book-btns">
                    {isLoading ? <Button type = "submit" disabled={!stripe} block disabled>Book</Button> : <Button type = "submit" disabled={!stripe} block>Book</Button>}
                    <Button type = "button" variant="danger" className ="cancel-btn" onClick={cancel} disabled={!stripe}>x</Button>
                </div>
                {isLoading ? <div className="home-spinner"><Spinner animation="border" variant="info" /> </div> : <></>}
            </form>
        </div>
    )
}



export default Book