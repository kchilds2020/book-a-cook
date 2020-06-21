import React from 'react'
import '../../styles/Order.css'

import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

function Order({cancel, price, title, picture}) {
    const stripe = useStripe();
    const elements = useElements();
    const total = (parseInt(price) + 5 + (parseInt(price) * .08)).toFixed(2)

    const payItem = async (event) => {
        event.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
          });
        console.log('paid!', paymentMethod, error)
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
            <div className="order-total">Total after Tax and Fees: ${total}</div>
            <div className="order-btns">
                <button className ="order-btn" onClick={payItem} disabled={!stripe}>Order</button>
                <button className ="cancel-btn" onClick={cancel} disabled={!stripe}>Cancel</button>
            </div>
        </div>
    )
}



export default Order
