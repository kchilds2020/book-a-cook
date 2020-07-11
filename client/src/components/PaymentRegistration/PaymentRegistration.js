import React, {useState} from 'react'
import Input from '../Input'
import StateDropDown from './StateDropDown'

function PaymentRegistration() {

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

    return (
        <form style={{width: '95%', maxWidth: '700px', backgroundColor:'white', margin: '20px auto', padding: '20px'}}>
            <Input value={firstname} setValue={setFirstname} identifier='firstname' labelText='First Name'/>
            <Input value={lastname} setValue={setLastname} identifier='lastname' labelText='Last Name'/>
            <Input value={email} setValue={setEmail} identifier='email' labelText='Email Address' type="email"/>
            <Input value={number} setValue={setNumber} identifier='number' labelText='Phone Number' type="tel"/>
            <Input value={dob} setValue={setDob} identifier='dob' labelText='Date of Birth' type="date"/>
            <Input value={addressLine1} setValue={setAddressLine1} identifier='address-line-1' labelText='Address Line 1'/>
            <Input value={addressLine2} setValue={setAddressLine2} identifier='address-line-2' labelText='Address Line 2'/>
            <Input value={city} setValue={setCity} identifier='city' labelText='City' />
            <StateDropDown state={state} setState={setState}/>
            <Input value={zip} setValue={setZip} identifier='zip' labelText='Zip Code' />
            <Input value={ssn} setValue={setSSN} identifier='ssn' labelText='Social Security Number' />
            <Input value={accountNumber} setValue={setAccountNumber} identifier='account-number' labelText='Account Number' />
            <Input value={routingNumber} setValue={setRoutingNumber} identifier='routing-number' labelText='Routing Number' />

        </form>
    )
}

export default PaymentRegistration
