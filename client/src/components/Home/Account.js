import React from 'react'
import '../../styles/Account.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function Account({user}) {

    const createStripeAccount = async(e) => {
        e.preventDefault()
        try{
            let response = await axios.post('/api/post/create-stripe-account',{user: user})
            console.log(response)
            window.location.href = response.data.url
        }catch(error){
            alert(error)
        }

    const payUser = async (e) => {
        e.preventDefault()

        try {
            let response = await axios.post('/api/post/pay-user',{user,amount}) 
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
        
    }
    return (

    <>
           <div className="header">
                <h3>Account Amount</h3>
            </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>In Account</th>
                    {/* <th>Total Earned</th> */}
                    <th>Send To Bank</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><h3><span style ={{color: 'green'}}>$</span>{(Math.round(user.account * 100) / 100).toFixed(2)}</h3></td>
                    {/* <td><h3><span style ={{color: 'green'}}>$</span>{(Math.round(user.totalEarned * 100) / 100).toFixed(2)}</h3></td> */}
                    <td>{user.bank_account_id ? <Button onClick = {payUser}>Pay Me</Button> : <Button onClick={() => window.location.href = '/profile'}>Link Bank</Button>}</td>

                </tr>
            </tbody>     
        </Table>
    </>
    )
}

export default Account
