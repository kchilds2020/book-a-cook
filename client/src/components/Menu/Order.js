import React, {useState} from 'react'
import '../../styles/Order.css'
import NumberInput from './NumberInput'

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

function Order({cancel, price, title, picture, email, dbID}) {
    const [qty, setQty] = useState(1)
    const [cardName, setCardName] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const total = ((parseInt(price) + 5 + (parseInt(price) * .08)) * qty ).toFixed(2)

    const payItem = async (event) => {
        event.preventDefault()
        //get client secret for specific item
        const clientSecretResponse = await axios.get(`/secret/item/${dbID}/${qty}`);
        const clientSecret = clientSecretResponse.data.client_secret
        //charge card
        const paymentResponse = await stripe.confirmCardPayment(`${clientSecret}`,{
            payment_method: {
                type: 'card',
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: `${cardName}`, 
                    email: email
                }
            }
          });
          paymentResponse.error ? alert(`Error! ${paymentResponse.error.message}`) : console.log('paid!', paymentResponse)
    }

    return (
        <div className="order-container">
            <div className="order-photo">
                <img src={`/api/get/image/${picture}`} alt =" " />
            </div>
            <div className="order-total">{title}</div>
            
            <NumberInput qty={qty} setQty={setQty}/>
            <div className="billing-header">Drop Off Address</div>
            <input type="text" id="card-name-input" placeholder="Street" required/>
            <div className="card-details">
                <input className="small-input" type="text" id="card-name-input" placeholder="City" required/>
                <input className="small-input" type="text" id="card-name-input" placeholder="State" required/>
                <input className="small-input" type="text" id="card-name-input" placeholder="Zip" required/>
            </div>
            <div className="billing-header">Billing Information</div>
            <input type="text" id="card-name-input" placeholder="Name on Card" value={cardName} onChange={e => setCardName(e.target.value)}/>
            <>
                <div className="card-element-container" >
                    <CardNumberElement/>
                </div>
                <div className="card-details">
                    <div className="detail-sec">
                        <div className="card-element-exp" >
                            <CardExpiryElement id="cardexpiry"/>
                        </div>
                    </div>
                    <div className="detail-sec">
                        <div className="card-element-cvc" >
                            <CardCvcElement id="cardcvc"/>
                        </div>
                    </div>
                </div>
            </>
        
            <div className="order-total" id="total-price">Total: ${total}</div>
            <div className="order-btns">
                <button className ="order-btn" onClick={payItem} disabled={!stripe}>Order</button>
                <button className ="cancel-btn" onClick={cancel} disabled={!stripe}>x</button>
            </div>
        </div>
    )
}



export default Order
