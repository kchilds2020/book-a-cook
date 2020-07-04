import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import SVG from '../images/SVG.svg';
import '../styles/Landing.css'
import {UserContext} from './UserContext'

const Landing = () => {

    const value = useContext(UserContext)
    console.log('USER CONTEXT: ', value)
    return(
        <>
            <div className = "landing-body">
                <div className = "landing-container">
                    <div className = "landing-section">
                        <h1 className = "landing-title">Look for Cooks</h1>
                        <h2 className = "landing-tagline">Chef made food delivered to your door!</h2>
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