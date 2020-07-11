import React, {useState, useContext} from 'react'
import Input from '../Input'
import StateDropDown from './StateDropDown'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {UserContext} from '../UserContext'

function PaymentRegistration() {

    let {user, menu} = useContext(UserContext)
    console.log('PAYMENT REGISTRATION USER CONTEXT', user, menu)

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [dob, setDob] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [ssn, setSSN] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [routingNumber, setRoutingNumber] = useState('')

    const submitInfo = async (e) => {
        e.preventDefault()
        const year = dob.slice(0,4)
        const month = dob.slice(5,7)
        const day = dob.slice(8)

        const data = {
            day: day,
            month: month,
            year: year,
            accountNumber: accountNumber,
            routingNumber: routingNumber,
            ssn: ssn
        }

        try{
            let response = await axios.post('/api/post/create-stripe-account', {user, data})
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    return (
        user ?
        <form onSubmit={submitInfo} style={{width: '95%', maxWidth: '700px', backgroundColor:'white', margin: '20px auto', padding: '20px'}}>
            <h2>Connect Your Bank Account</h2>
            {/* <Input value={user.firstName} setValue={setFirstname} identifier='firstname' labelText='First Name'/>
            <Input value={user.lastName} setValue={setLastname} identifier='lastname' labelText='Last Name'/>
            <Input value={user.email} setValue={setEmail} identifier='email' labelText='Email Address' type="email"/>
            <Input value={number} setValue={setNumber} identifier='number' labelText='Phone Number' type="tel"/> */}
            <Input value={dob} setValue={setDob} identifier='dob' labelText='Date of Birth' type="date"/>
{/*             <Input value={addressLine1} setValue={setAddressLine1} identifier='address-line-1' labelText='Address Line 1'/>
            <Input value={addressLine2} setValue={setAddressLine2} identifier='address-line-2' labelText='Address Line 2'/>
            <Input value={city} setValue={setCity} identifier='city' labelText='City' />
            <StateDropDown state={state} setState={setState}/>
            <Input value={zip} setValue={setZip} identifier='zip' labelText='Zip Code' /> */}
            <Input value={ssn} setValue={setSSN} identifier='ssn' labelText='Social Security Number (Last Four Digits)' maxLength='4'/>
            <Input value={accountNumber} setValue={setAccountNumber} identifier='account-number' labelText='Account Number' maxLength='12'/>
            <Input value={routingNumber} setValue={setRoutingNumber} identifier='routing-number' labelText='Routing Number' maxLength='9' />
            <Button type="submit">Submit</Button>
        </form> : <></>
    )
}

export default PaymentRegistration
