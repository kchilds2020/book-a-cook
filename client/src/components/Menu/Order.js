import React from 'react'
import '../../styles/Order.css'

import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

function Order({cancel, price, title, picture, firstname, lastname, email, dbID}) {
    const stripe = useStripe();
    const elements = useElements();
    const total = (parseInt(price) + 5 + (parseInt(price) * .08)).toFixed(2)
    console.log('ORDER', firstname, lastname, email)

    const payItem = async (event) => {
        event.preventDefault()
        const clientSecretResponse = await axios.get(`/secret/item/${dbID}`);
        console.log('CLIENT SECRET RESPONSE', clientSecretResponse)
        const clientSecret = clientSecretResponse.data.client_secret
        console.log('CLIENT SECRET',clientSecret);
        const paymentResponse = await stripe.confirmCardPayment(`${clientSecret}`,{
            payment_method: {
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: `${firstname} ${lastname}`, 
                    email: email
                }
            }
          });
        console.log('paid!' , paymentResponse )
    }
    const cardElementOptions = {
        style:{
            base: {
                fontSize: "16px",
            }
            
        },
        hidePostalCode: true
    }

    return (
        <div className="order-container">
            <div className="order-photo">
                <img src={`/api/get/image/${picture}`} alt =" " />
            </div>
            <div className="order-total">{title}</div>
            <label htmlFor="address-input">Address</label>
            <input type="text" id="address-input" />
            <label htmlFor="qty-input">Quantity</label>
            <input type="text" id="qty-input" />
            <label htmlFor="card-info">Card Info</label>
            <div className="card-element-container" id = "card-info">
                <CardElement options={cardElementOptions}/>
            </div>
            <div className="order-total">Total: ${total}</div>
            <div className="order-btns">
                <button className ="order-btn" onClick={payItem} disabled={!stripe}>Order</button>
                <button className ="cancel-btn" onClick={cancel} disabled={!stripe}>Cancel</button>
            </div>
        </div>
    )
}



export default Order
