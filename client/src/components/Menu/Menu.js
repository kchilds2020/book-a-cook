import React, {useEffect, useState, useContext} from 'react'
import MenuItem from './MenuItem'
import axios from 'axios'
import '../../styles/Menu.css'
import Spinner from 'react-bootstrap/Spinner'
import {UserContext} from '../UserContext'


function Menu() {
    let {user, menu} = useContext(UserContext)
    console.log('MENU USER CONTEXT', user, menu)

    const [menuArray, setMenuArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');
    const [shadow, setShadow] = useState(false);
    useEffect(() => {
        let mounted = true;
        axios.get('api/get/menu')
        .then(response => {
            if(mounted){
                setLoading(false)
                setMenuArray(response.data)
                setError('');
            }
        })
        .catch(error => {
            setLoading(false)
            setMenuArray([])
            setError('Something went wrong!');
        })
        return () => mounted = false;
  
    },[])


    return (
        <>
            <div className="menu-page-container">
                {loading ? <div className="home-spinner"><Spinner animation="border" variant="info" /> </div> : menuArray.map((element,index) => <MenuItem  key={index} title={element.title} description={element.description} price={element.price} picture={element.picture} chefUsername={element.username} itemNum={index} dbID={element._id} user={user !== null ? user : ''}/>)}
                {err ? err : null}
            </div>
        </>
    )
}

export default Menu
