import React from 'react'
import PIC from '../images/pic.jpeg';
import '../styles/CookSummary.css';
function Cook({firstname, lastname, specialty, price, description}) {
    return (
        <>
            <div className="profile">
                    <div className="pictureDiv">
                        <img src={PIC} className = "picture" alt='profile pic'/>
                    </div>
                    <div className = "cookName">
                        <h2>{firstname} {lastname}</h2>
                    </div>
                    <div className = "positionTitle">
                        <h3>{specialty}</h3>
                    </div>
                    <div className = "cookPrice">
                        <h4>${price} an hour</h4>
                    </div>
                    <div className = "cookDescription">
                        <p>{description}</p>
                    </div>
            </div>
        </>
    )
}

export default Cook