import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import MyOrderItem from './MyOrderItem'
import Table from 'react-bootstrap/Table'
import Account from './Account'
import Button from 'react-bootstrap/Button'
import CreateMenuItem from '../PopUps/CreateMenuItem'
import Overlay from '../PopUps/Overlay'
import {CenterSpinner} from '../GeneralStyles'
import {HomeHeader, HomeSectionContainer, NumColorDark} from './HomeStyles'

function MyOrders({username, user}) {
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');
    const [orders,setOrders] = useState([])
    const [visibility,setVisibility] = useState(false)

    useEffect(() => {
        const getActiveOrders = async () => {
            try {
                let response = await axios.get(`/api/get/active-orders/${username}`)
                setLoading(false)
                let sorted = response.data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                setOrders(sorted);
                setError('');
            } catch (error) {
                console.log(error);
                setLoading(false)
                setOrders([])
                setError('Something went wrong!');
            }
        }

        if(username !== ''){
                getActiveOrders()   
         }
     },[username])

    return (
        <>
            <HomeHeader style={{marginBottom: '0px', borderRadius: '8px 8px 0px 0px'}}><NumColorDark>{orders.length}</NumColorDark> Active Orders</HomeHeader>
            {loading ? <CenterSpinner><Spinner animation="border" variant="info" /></CenterSpinner> : 
                <Table borderless hover style={{ backgroundColor: 'white', textAlign: 'center', borderRadius: '0px 0px 8px 8px'}}>
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
        {/* <Button variant='info' onClick = {() => setVisibility(true)} style ={{marginTop: '10px'}} block>Create Menu Items and Get Paid!</Button> */}
        {visibility ? <>
                        <CreateMenuItem user={user} setOpen={setVisibility}/> 
                        <Overlay setVisibility ={setVisibility}/>
                    </>: <></>}
                {err ? err : null}
        </>
    )
}
 
export default MyOrders
