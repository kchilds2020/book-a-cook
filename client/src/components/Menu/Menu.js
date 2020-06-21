import React, {useEffect, useState} from 'react'
import MenuItem from './MenuItem'
import axios from 'axios'
import NavBar from '../NavBar'


function Menu() {

    const [menuArray, setMenuArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');

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
            <NavBar active={'menu-page'}/>
            <div className="menu-page-container">
                {loading ? 'LOADING...' : menuArray.map((element,index) => <MenuItem  key={index} title={element.title} description={element.description} price={element.price} picture={element.picture} username={element.username} editable={false} itemNum={index} dbID={element._id}/>)}
                {err ? err : null}
            </div>
        </> 
    )
}

export default Menu
