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
{/*                 {editable === true ? <input type ="text" className = "menu-item-title" value = {itemTitle} onChange = {ev => setItemTitle(ev.target.value)} id = {`menu-item-title-${itemNum}`} /> : <div className = "menu-item-title" id = {`menu-item-title-${itemNum}`}>{itemTitle}</div>}
 */}                <div className = "menu-item-rating" id = {`menu-item-title-${itemNum}`}>{'5 stars'}</div>
{/*                 {editable === true ? <input type ="text" className = "menu-item-rating" value = {itemRating} onChange = {ev => setItemRating(ev.target.value)} id = {`menu-item-title-${itemNum}`} /> : <div className = "menu-item-rating" id = {`menu-item-title-${itemNum}`}>{itemRating}</div>}
 */}                <div className = "menu-item-description" id = {`menu-item-description-${itemNum}`}> {description} </div>
{/*                 {editable === true ? <input type ="text" className = "menu-item-description" value = {itemDescription} onChange = {ev => setItemDescription(ev.target.value)} id = {`menu-item-description-${itemNum}`} /> : <div className = "menu-item-description" id = {`menu-item-description-${itemNum}`}> {itemDescription} </div>}
 */}                <div className = "menu-item-location" id = {`menu-item-location-${itemNum}`} >{'Mansfield, Texas'} </div>
{/*                 {editable === true ? <input type ="text" className = "menu-item-location" value = {itemLocation} onChange = {ev => setItemLocation(ev.target.value)} id = {`menu-item-location-${itemNum}`} /> : <div className = "menu-item-location" id = {`menu-item-location-${itemNum}`} >{itemLocation} </div>}
 */}                <div className = "menu-item-price" id = {`menu-item-price-${itemNum}`}>${price}</div>
{/*                 {editable === true ? <input type ="text" className = "menu-item-price" value = {`\$${itemPrice}`} onChange = {ev => setItemPrice(ev.target.value)} id = {`menu-item-price-${itemNum}`} /> : <div className = "menu-item-price" id = {`menu-item-price-${itemNum}`}>${itemPrice}</div>}
 */}                {editable === false ? <button className="menu-item-btn">Order!</button>:<></>}        
            </div>
        </div>
    )
}

export default MenuItem
