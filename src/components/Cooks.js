import React from 'react'
import PIC from '../images/pic.jpeg';
import '../styles/CookSummary.css'
function Cooks() {
    return (
        <>
            <div className="profile">
                    <div className="pictureDiv">
                        <img src={PIC} className = "picture" alt='profile pic'/>
                    </div>
                    <div className = "cookName">
                        <h2>Kevin Childs</h2>
                    </div>
                    <div className = "positionTitle">
                        <h3>Lorem ipsum dolor sit amet.</h3>
                    </div>
                    <div className = "cookPrice">
                        <h4>$50 an hour</h4>
                    </div>
                    <div className = "cookDescription">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa optio animi laboriosam quaerat dolorum laborum nobis vitae alias blanditiis suscipit.</p>
                    </div>
            </div>
        </>
    )
}

export default Cooks
