import React, {useEffect, useState} from 'react'
import MenuItem from './MenuItem'
import axios from 'axios'
import '../../styles/Menu.css'
import Spinner from 'react-bootstrap/Spinner'


function Menu({firstname, lastname, email, cook}) {

    const [menuArray, setMenuArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');
    console.log('MENU', firstname, lastname, email)
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
                {loading ? <div className="home-spinner"><Spinner animation="border" variant="info" /> </div> : menuArray.map((element,index) => <MenuItem  key={index} title={element.title} description={element.description} price={element.price} picture={element.picture} username={element.username} editable={false} itemNum={index} dbID={element._id} firstname={firstname} lastname={lastname} email={email}/>)}
                {err ? err : null}
            </div>
        </> 
    )
}

export default Menu
