import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import MyOrderItem from './MyOrderItem'
import Table from 'react-bootstrap/Table'
import Account from './Account'
import Button from 'react-bootstrap/Button'
import CreateMenuItem from '../CreateMenuItem'
import Overlay from '../Overlay'
import {CenterSpinner} from '../GeneralStyles'
import {HomeHeader, HomeSectionContainer, NumColorDark} from './HomeStyles'

function MyOrders({username, user}) {
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');
    const [orders,setOrders] = useState([])
    const [visibility,setVisibility] = useState(false)

    useEffect(() => {
        let mounted = true;
        if(username !== ''){
                axios.get(`/api/get/active-orders/${username}`)
                .then(response => {
                    if(mounted){
                    console.log('ACTIVE ORDERS',response.data)
                    setLoading(false)
                    let sorted = response.data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                    setOrders(sorted);
                    setError('');
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false)
                    setOrders([])
                    setError('Something went wrong!');
                })
            return () => mounted = false        
         }
     },[username])

    return (
        <HomeSectionContainer>
            <Account user={user}/>
            <HomeHeader><NumColorDark>{orders.length}</NumColorDark> Active Orders</HomeHeader>
            {loading ? <CenterSpinner><Spinner animation="border" variant="info" /></CenterSpinner> : 
                <Table striped bordered hover style={{marginTop: '10px', backgroundColor: 'white', textAlign: 'center', boxShadow: '0px 0px 4px #212529'}}>
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Address</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? orders.map((element, index) => <MyOrderItem key={index} orderNum={index}  title={element.menuItemTitle} quantity={element.qty} address={element.address} orderID={element._id} completed={element.completed} pending={element.pending}/>) : <></>} 
                    </tbody>     
                </Table>}
        <Button onClick = {() => setVisibility(true)} style ={{marginTop: '10px'}} block>Create Menu Items and Get Paid!</Button>
        {visibility ? <>
                        <CreateMenuItem user={user} setOpen={setVisibility}/> 
                        <Overlay setVisibility ={setVisibility}/>
                    </>: <></>}
                {err ? err : null}
        </HomeSectionContainer>
    )
}
 
export default MyOrders
