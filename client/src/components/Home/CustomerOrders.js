import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import CustomerOrder from './CustomerOrder'

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
                            <th>Chef</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {orders.length > 0 ? orders.map((element, index) => 
                        <CustomerOrder key = {index} pending={element.pending} completed = {element.completed} title={element.menuItemTitle} qty={element.qty} orderID = {element._id} chef={element.chefUsername}/>) : <></>} 
                    </tbody>     
                </Table>
                
            </div>
        </div>
    )
}

export default CustomerOrders
