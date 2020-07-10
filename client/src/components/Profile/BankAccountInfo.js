import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Input from '../Input'
import axios from 'axios'

function BankAccountInfo({user, setBankAccountID, setModified}) {

    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');

    const addBankAccount = async (e) => {
        e.preventDefault()
        if(routingNumber === '' || accountNumber === ''){
            alert('please fill out account number and routing number')
        }else{
            const bank = {
                routing_number: routingNumber,
                account_number: accountNumber
            }
            try{
                let response = await axios.post('/api/post/add-bank-account', {user, bank})
                console.log(response)
                setBankAccountID(response.data.id)
                setModified(true)
            }catch(err){
                console.log(err)
            }
        }
    }

    return (
        <div>
            <div>Bank Information has not Been Added!</div>
            <Input value = {accountNumber} setValue={setAccountNumber} identifier='accountNumber' labelText="Account Number"/>
            <Input value = {routingNumber} setValue={setRoutingNumber} identifier='routingNumber' labelText="Routing Number"/>
            <Button onClick={addBankAccount}>Verify Bank Account</Button>
        </div>
    )
}

export default BankAccountInfo
