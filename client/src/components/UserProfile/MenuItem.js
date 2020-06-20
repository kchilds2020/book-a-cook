import React from 'react'
import '../styles/MenuItem.css'

function MenuItem({title, description, price, username, picture, editable=false, itemNum, menuItems, setMenuItems, dbID, deleteMenuItem}) {

    console.log('EDITABLE', editable)

    const deleteItem = async (event) =>{
        event.preventDefault();

        deleteMenuItem(dbID, itemNum)
    }

    return (
        <div className="menu-item-container">
            {editable === true ? <button className="delete-mi-btn" onClick={deleteItem}>x</button> : <></>}
            <div className="menu-photo">
                <img src={`/api/get/image/${picture}`} alt =" " />
            </div>
            <div className = "menu-item-details">
                <div className = "menu-item-title" id = {`menu-item-title-${itemNum}`}>{title}</div>
                <div className = "menu-item-rating" id = {`menu-item-title-${itemNum}`}>{'5 stars'}</div>
                <div className = "menu-item-description" id = {`menu-item-description-${itemNum}`}> {description} </div>
                <div className = "menu-item-location" id = {`menu-item-location-${itemNum}`} >{'Mansfield, Texas'} </div>
                <div className = "menu-item-price" id = {`menu-item-price-${itemNum}`}>${price}</div>
                {editable === false ? <button className="menu-item-btn">Order!</button>:<></>}        
            </div>
        </div>
    )
}

export default MenuItem
