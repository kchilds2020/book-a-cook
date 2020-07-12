import React, {useState, useEffect} from 'react'
import '../../styles/MyOrders.css'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import MyOrderItem from './MyOrderItem'
import Table from 'react-bootstrap/Table'
import Account from './Account'
import Button from 'react-bootstrap/Button'
import CreateMenuItem from '../CreateMenuItem'

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
        <div className = "home-sec-container">
            <Account user={user}/>
            <div className="header">
                <h3><span className="post-num">{orders.length}</span> Active Orders</h3>
            </div>
    {loading ? <div className="home-spinner"><Spinner animation="border" variant="info" /> </div> : 
        <Table striped bordered hover>
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
        {visibility ? <CreateMenuItem user={user} /> : <></>}
                {err ? err : null}
        </div>
    )
}
 
export default MyOrders
