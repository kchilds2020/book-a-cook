import React, {useState} from 'react'
import '../../styles/Order.css'
import NumberInput from './NumberInput'

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js';
import axios from 'axios';

function Order({cancel, price, title, picture, dbID, user, chefUsername}) {
    const [qty, setQty] = useState(1)
    const [cardName, setCardName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

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
                card: elements.getElement(CardElement),
                billing_details: {
                    name: `${cardName}` 
                }
            }
          });
          if(paymentResponse.error){
              alert(`Error! ${paymentResponse.error.message}`) 
          }else{
            
            //create order
            let orderData = {
                menuItemID: dbID,
                menuItemTitle: title,
                qty: qty,
                picture: picture,
                address: `${street}, ${city}, ${state}, ${zip}`,
                chefUsername: chefUsername,
                customerUsername: user.username === '' ? cardName : user.username,
                user: user
            }
            try{
                let response = axios.post('/api/post/create-order', orderData)
                alert('Order has been placed!')
                console.log('paid!', paymentResponse, response)
                /* window.location.href='/home' */
            }
            catch (error){
                alert(`Try catch error: ${error}`)
            }
        }
    }

    return (
        
        <div className="order-container">

            <div className="order-photo">
                <img src={`/api/get/image/${picture}`} alt =" " />
            </div>  
            <div className="order-total">{title}</div>
            
            <form onSubmit={payItem}>
                <NumberInput qty={qty} setQty={setQty}/>
                <div className="billing-header">Drop Off Address</div>
                <input type="text" id="street-input" placeholder="Street" onChange = {e => setStreet(e.target.value)} required/>
                <div className="card-details">
                    <input className="small-input" type="text" id="fity-input" placeholder="City" onChange = {e => setCity(e.target.value)} required/>
                    <input className="small-input" type="text" id="state-input" placeholder="State" onChange = {e => setState(e.target.value)} required/>
                    <input className="small-input" type="text" id="zip-input" placeholder="Zip" onChange = {e => setZip(e.target.value)} required/>
                </div>
                <div className="billing-header">Billing Information</div>
                <input type="text" id="card-name-input" placeholder="Name on Card" value={cardName} onChange={e => setCardName(e.target.value)} required/>
                <div className="card-element-container" >
                    <CardElement />
                </div>
                {/* <>
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
                </> */}
            
                <div className="order-total" id="total-price">Total: ${total}</div>
                <div className="order-btns">
                    <button type = "submit" className ="order-btn" disabled={!stripe}>Order</button>
                    <button type = "button" className ="cancel-btn" onClick={cancel} disabled={!stripe}>x</button>
                </div>
            </form>
        </div>
    )
}



export default Order
