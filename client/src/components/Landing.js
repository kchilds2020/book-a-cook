import React from 'react';
import {Link} from 'react-router-dom';
import SVG from '../images/SVG.svg';
import '../styles/Landing.css'

const Landing = () => {
    return(
        <>
            <div className = "landing-body">
                <div className = "landing-container">
                    <div className = "landing-section">
                        <h1 className = "landing-title">Book a Cook!</h1>
                        <h2 className = "landing-tagline">Hire Professional Chefs to cook for you at home!</h2>
                        <Link to ="/login">
                            <button className="landing-btn">Login</button>
                        </Link>    
                    </div>
                    <div className = "landing-section">
                        <img className = "landing-sectionIMG" src={SVG} alt="landing" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;