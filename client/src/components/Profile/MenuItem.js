import React, {useState} from 'react'
import '../../styles/MenuItem.css'
import Confirm from '../Confirm'

function MenuItem({title, description, price, picture, itemNum, dbID, deleteMenuItem}) {

    const [visible, setVisibility] = useState(false);

    console.log(`MENU ITEM ${itemNum}`, title, description, price, picture, itemNum, dbID)

    const deleteItem = async (event) =>{
        event.preventDefault();
        deleteMenuItem(dbID, itemNum)
        setVisibility(false)
    }
    const confirmDeletion = (event) => {
        event.preventDefault();
        setVisibility(true)
    }

    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
    }

    return (
        <div className="menu-item-container">
            <button className="delete-mi-btn" onClick={confirmDeletion}>x</button>
            <div className="menu-photo">
                <img src={`/api/get/image/${picture}`} alt =" " />
            </div>
            <div className = "menu-item-details">
                <div className = "menu-item-title" id = {`menu-item-title-${itemNum}`}>{title}</div>
                <div className = "menu-item-rating" id = {`menu-item-title-${itemNum}`}>{'5 stars'}</div>
                <div className = "menu-item-description" id = {`menu-item-description-${itemNum}`}> {description} </div>
                <div className = "menu-item-location" id = {`menu-item-location-${itemNum}`} >{'Mansfield, Texas'} </div>
                <div className = "menu-item-price" id = {`menu-item-price-${itemNum}`}>${price}</div>     
            </div>
            {visible === true ? <Confirm message={`Are you sure you want to delete Menu Item "${title}"?`} confirm = {deleteItem} cancel={cancelItem}/> : <></>}
        </div>
    )
}

export default MenuItem
