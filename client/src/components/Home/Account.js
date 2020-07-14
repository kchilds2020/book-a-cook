import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import {HomeHeader} from './HomeStyles'


function Account({user}) {

    const [accountBalance, setAccountBalance] = useState(0)
    const [pendingBalance, setPendingBalance] = useState(0)
    const [isLoading, setLoading] = useState(true) 

    useEffect(() => {

        const getAccountInfo = async () => {
            try{
                let response = await axios.get(`/api/get/account-balance/${user._id}`)
                console.log('ACCOUNT RESPONSE', response)
                setAccountBalance(response.data.available[0].amount)
                setPendingBalance(response.data.pending[0].amount)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        }

        let mounted = true
        if(mounted){
            getAccountInfo()
        }

        return () => mounted = false
    },[user._id])

    return (

    <>
        <HomeHeader>Account Amount</HomeHeader>
        <Table striped bordered hover style={{marginTop: '10px', backgroundColor: 'white', textAlign: 'center', boxShadow: '0px 0px 4px #212529'}}>
            <thead>
                <tr>
                    <th>In Account</th>
                    <th>Pending Amount</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{isLoading ? <Spinner animation="border" variant="info" /> : <h3><span style ={{color: 'green'}}>$</span>{parseFloat(accountBalance / 100).toFixed(2)}</h3>}</td>
                    <td>{isLoading ? <Spinner animation="border" variant="info" /> : <h3><span style ={{color: 'green'}}>$</span>{parseFloat(pendingBalance / 100).toFixed(2)}</h3>}</td>
                    {/* <td>{user.bank_account_id ? <Button onClick = {payUser}>Pay Me</Button> : <Button onClick={() => window.location.href = '/profile'}>Link Bank</Button>}</td> */}

                </tr>
            </tbody>     
        </Table>
    </>
    )
}

export default Account
