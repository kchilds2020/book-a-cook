import React, {useState} from 'react'
import NumberInput from './NumberInput'
import {useHistory} from 'react-router-dom'
import {PopUp} from '../PopUps/PopUpStyles'
import {OrderTitleContainer, CardElementContainer, Span, OrderPrice, OrderHeader, OrderTitle, OrderTitleImg, OrderInput} from './OrderStyles'
import Button from 'react-bootstrap/Button'

import {
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js';
import axios from 'axios';

function Order({ price, title, picture, dbID, user, chefUsername}) {
    const [qty, setQty] = useState(1)
    const [cardName, setCardName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [email, setEmail] = useState('');

    let history = useHistory();

    const stripe = useStripe();
    const elements = useElements();
    const total = ((parseInt(price) + (parseInt(price) * .08)) * qty ).toFixed(2)

    const payItem = async (event) => {
        event.preventDefault()
        //get client secret for specific item
        try{
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
                    createdDate: Date.now(),
                    menuItemTitle: title,
                    qty: qty,
                    picture: picture,
                    address: `${street}, ${city}, ${state}, ${zip}`,
                    chefUsername: chefUsername,
                    customerUsername: user.username === '' ? cardName : user.username,
                    customerEmail: user ? user.email : email,
                    user: user
                }
                
                    let response = axios.post('/api/post/create-order', orderData)
                    
                    console.log('paid!', paymentResponse, response)
                    /* window.location.href='/home' */
                    alert('Order has been placed!')
                    history.push('/home')
                }
        }
        catch (error){
                alert(`Error: ${error}`)
        }

    }

    return (
        
        <PopUp>

            <OrderTitleContainer>
                <OrderTitleImg src={`/api/get/image/${picture}`} alt =" " />
                <OrderTitle>{title}</OrderTitle>
            </OrderTitleContainer>              
            <form onSubmit={payItem}>
                <NumberInput qty={qty} setQty={setQty}/>
                <OrderHeader>Drop Off Address</OrderHeader>
                <OrderInput type="text" id="street-input" placeholder="Street" onChange = {e => setStreet(e.target.value)} required/>
                <Span>
                    <OrderInput style ={{width: '30%'}} type="text" id="fity-input" placeholder="City" onChange = {e => setCity(e.target.value)} required/>
                    <OrderInput  style ={{width: '30%'}}  type="text" id="state-input" placeholder="State" onChange = {e => setState(e.target.value)} required/>
                    <OrderInput style ={{width: '30%'}}  type="text" id="zip-input" placeholder="Zip" onChange = {e => setZip(e.target.value)} required/>
                </Span>
                <OrderHeader>Billing Information</OrderHeader>
                {!user ? <OrderInput type="email" id="email-input" placeholder="Email for Notifications" onChange = {e => setEmail(e.target.value)} required/> : <></>}
                <OrderInput type="text" id="card-name-input" placeholder="Name on Card" value={cardName} onChange={e => setCardName(e.target.value)} required/>
                <CardElementContainer>
                    <CardElement />
                </CardElementContainer>
            
                <OrderPrice>Total: ${total}</OrderPrice>
                <Button type = "submit"  disabled={!stripe} block>Order</Button>
            </form>
        </PopUp>
    )
}



export default Order
