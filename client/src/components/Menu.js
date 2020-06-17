import React, {useEffect,useState} from 'react'
import axios from 'axios'
import MenuItem from './MenuItem'

function Menu({username}) {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get(`/api/get/menu-items/${username}`)
        .then(response => setItems(response.data))
        .catch(err => console.log(err))
    }, [username])

    return (
        <>
            {items.length > 0 ? items.map((element,index) => <MenuItem title={element.title} description={element.description} price={element.price} picture={element.picture} username={element.username}/>) : <>No Menu Items</>}
        </>
    )
}

export default Menu
