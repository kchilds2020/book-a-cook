import React from 'react'
import '../styles/MenuItem.css'

function MenuItem({title, description, price, username, picture}) {
    return (
        <div className="menu-item-container">
            <div className="menu-photo">
                <img src={`/api/get/image/${picture}`} alt =" " />
            </div>
            <div className = "menu-item-details">
                <div className = "menu-item-title">
                    {title}
                </div>
                <div className = "menu-item-rating">
                    5 stars
                </div>
                <div className = "menu-item-description">
                    {description}
                </div>
                <div className = "menu-item-location">
                    Mansfield, Texas
                </div>
                <div className = "menu-item-price">
                    ${price}.00
                </div>
                <button className="menu-item-btn">
                    Order!    
                </button>
                
            </div>
        </div>
    )
}

export default MenuItem
