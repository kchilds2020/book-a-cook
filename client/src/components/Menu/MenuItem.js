import React, {useState} from 'react'
import '../../styles/MenuItem.css'
import Order from './Order';

function MenuItem({title, description, price, username, picture, editable=false, itemNum, menuItems, setMenuItems, dbID, deleteMenuItem, firstname, lastname, email}) {

    const [visible, setVisibility] = useState(false);
    console.log('MENUITEM', firstname, lastname, email)
    const orderItem = (event) =>{
        event.preventDefault();
        console.log('order!')
        setVisibility(true);
    }
    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
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
                <button className="menu-item-btn" onClick={orderItem}>Order!</button>    
            </div>
            {visible ? <Order cancel={cancelItem} price={price} title={title} picture={picture} firstname={firstname} lastname={lastname} email={email} dbID = {dbID}/> : <></>}
        </div>
    )
}

export default MenuItem
