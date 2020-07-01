import React from 'react'
import '../../styles/Account.css'
import Table from 'react-bootstrap/Table'

function Account({user}) {
    return (
        <div className="account-container">
           <div className="account-header">
                <h3>Account Amount</h3>
            </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>In Account</th>
                    <th>Total Earned</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><h3><span style ={{color: 'green'}}>$</span>{(Math.round(user.account * 100) / 100).toFixed(2)}</h3></td>
                    <td><h3><span style ={{color: 'green'}}>$</span>{(Math.round(user.totalEarned * 100) / 100).toFixed(2)}</h3></td>

                </tr>
            </tbody>     
        </Table>

        </div>
    )
}

export default Account
