import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import CustomerOrder from './CustomerOrder'
import Button from 'react-bootstrap/Button'
import {UpcomingJobContainer, HomeHeader, NumColorDark, HomeSectionContainer} from './HomeStyles'

function CustomerOrders({username}) {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getCustomerOrders = async () => {
            try{
            let response = await axios.get(`/api/get/customer-orders/${username}`)
            setOrders(response.data)
            }catch(error){console.log(error)}
        }
        getCustomerOrders()
     },[username])



    return (
        <HomeSectionContainer>
            <HomeHeader><NumColorDark>{orders.length}</NumColorDark> Open Orders</HomeHeader>
            <UpcomingJobContainer>
                <Table striped bordered hover style={{marginTop: '10px', backgroundColor: 'white', textAlign: 'center', boxShadow: '0px 0px 4px #212529'}}>
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
            </UpcomingJobContainer>
            <Button onClick = {() => window.location.href = '/menu'} style ={{marginTop: '10px'}} block>Find Food Near Me</Button>
        </HomeSectionContainer>
    )
}

export default CustomerOrders
