import React from 'react'
import '../../styles/Account.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function Account({user}) {

    const createStripeAccount = async(e) => {
        e.preventDefault()
        try{
            let response = await axios.post('/api/post/create-stripe-account')
            console.log(response)
        }catch(error){
            alert(error)
        }

        /* window.open(response.data.url, '_blank') */
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
                    <th>Total Earned</th>
                    <th>Link Account</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><h3><span style ={{color: 'green'}}>$</span>{(Math.round(user.account * 100) / 100).toFixed(2)}</h3></td>
                    <td><h3><span style ={{color: 'green'}}>$</span>{(Math.round(user.totalEarned * 100) / 100).toFixed(2)}</h3></td>
                    <td><Button onClick={createStripeAccount}>Link</Button></td>

                </tr>
            </tbody>     
        </Table>
    </>
    )
}

export default Account
