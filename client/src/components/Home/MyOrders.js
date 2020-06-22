import React, {useState, useEffect} from 'react'
import '../../styles/MyOrders.css'
import axios from 'axios'

function MyOrders({username}) {

    const [orders,setOrders] = useState([])

    useEffect(() => {
        let mounted = true;
        if(username !== ''){
                axios.get(`/api/get/active-orders/${username}`)
                .then(response => {
                    if(mounted){
                    console.log('ACTIVE ORDERS',response.data)
                    let sorted = response.data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                    setOrders(sorted);
                    }
                })
            return () => mounted = false        
         }
     },[username])

    return (
        <div className = "my-orders-container">
            <div className="my-orders-header">
                <h3>You have <span className="post-num">{orders.length}</span> orders.</h3>
            </div>
        </div>
    )
}

export default MyOrders
