import React, {useState, useContext} from 'react'
import Input from '../InputComponents/Input'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {UserContext} from '../UserContext'
import Spinner from 'react-bootstrap/Spinner'
import {FixedCenter} from '../GeneralStyles'

function PaymentRegistration() {

    let {user, menu} = useContext(UserContext)
    console.log('PAYMENT REGISTRATION USER CONTEXT', user, menu)

    const [dob, setDob] = useState('')
    const [ssn, setSSN] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [routingNumber, setRoutingNumber] = useState('')
    const [isLoading, setLoading] = useState(false)

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
            setLoading(true)
            let response = await axios.post('/api/post/create-stripe-account', {user, data})
            setLoading(false)
            alert(response.data)
            window.location.href = '/cook-registration'
        }catch(error){
            console.log(error)
        }
    }

    return (
        user ?
        <>
        <form onSubmit={submitInfo} style={{width: '95%', maxWidth: '700px', backgroundColor:'white', margin: '20px auto', padding: '20px',boxShadow: '0px 0px 4px #333', borderRadius: '8px'}}>
            <h2>Connect Your Bank Account</h2>
            <Input value={dob} setValue={setDob} identifier='dob' labelText='Date of Birth' type="date"/>
            <Input value={ssn} setValue={setSSN} identifier='ssn' labelText='Social Security Number (Last Four Digits)' maxLength='4'/>
            <Input value={accountNumber} setValue={setAccountNumber} identifier='account-number' labelText='Account Number' maxLength='12'/>
            <Input value={routingNumber} setValue={setRoutingNumber} identifier='routing-number' labelText='Routing Number' maxLength='9' />
            <Button type="submit">Submit</Button>
        </form> 
        {isLoading ? <FixedCenter><Spinner animation="border" variant="info" /> </FixedCenter> : <></>}
        </>: <></>
    )
}

export default PaymentRegistration
