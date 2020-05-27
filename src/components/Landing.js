import React from 'react';
import SVG from '../images/SVG.svg';
import '../App.css';

const Landing = () => {
    return(
        <div className = "Landing">
            <div className = "section">
                <h1>Book a Cook!</h1>
                <h2>Hire Professional Chefs to cook for you at home!</h2>
            </div>
            <div className = "section">
                <img src={SVG} alt="landing"></img>
            </div>
        </div>
    );
};

export default Landing;