import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function CustomerOrders({username}) {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        let mounted = true
        if(username !== ''){
             //get all posts
             axios.get(`/api/get/customer-orders/${username}`)
             .then(response => {
                 if(mounted){
                    console.log('CUSTOMER ORDERS',response.data)
                    setOrders(response.data);
                }
             })
             return () => mounted = false
         }
     },[username])

    return (
        <div className = "home-sec-container" >
            <div className="header">
                <h3><span className="post-num">{orders.length}</span> Open Orders.</h3>
            </div>
            <div className="profile-job-posts">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? orders.map((element, index) => 
                        <tr key = {index}>
                            <td>{element.menuItemTitle}</td>
                            <td>{element.qty}</td>
                            <td><Button>Confirm Delivery</Button></td>
                        </tr>
                        ) : <></>} 
                    </tbody>     
                </Table>
            </div>
        </div>
    )
}

export default CustomerOrders
