import React, {useState} from 'react'
import '../../styles/MenuItem.css'
import Order from './Order';
import Button from 'react-bootstrap/Button'
import Popup from "reactjs-popup";

function MenuItem({title, description, price, chefUsername, picture, itemNum, dbID, shadow, setShadow, username}) {

    const [visible, setVisibility] = useState(false);
    console.log('USERNAME',username)
    const orderItem = (event) =>{
        event.preventDefault();
        console.log('order!')
        setVisibility(true);
        setShadow(true)
    }
    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
        setShadow(false)
    }

    return (
        <div className="menu-item-container">
            <div className="menu-photo">
                <img src={`/api/get/image/${picture}`} alt =" " />
            </div>
            <div className = "menu-item-details">
                <div className = "menu-item-title" id = {`menu-item-title-${itemNum}`}>{title}</div>
                <div className = "menu-item-rating" id = {`menu-item-title-${itemNum}`}>{'5 stars'}</div>
                <div className = "menu-item-description" id = {`menu-item-description-${itemNum}`}> {description} </div>
                <div className = "menu-item-location" id = {`menu-item-location-${itemNum}`} >{'Mansfield, Texas'} </div>
                <div className = "menu-item-price" id = {`menu-item-price-${itemNum}`}>${price}</div>
                <Button style={{margin: '10px'}} onClick={orderItem}>Order!</Button>    
            </div>
                {visible ? <Order cancel={cancelItem} price={price} title={title} picture={picture} dbID = {dbID} chefUsername={chefUsername} username={username}/> : <></>}
        </div>
    )
}

export default MenuItem
