import React, {useContext} from 'react';
import '../styles/Landing.css'
import {UserContext} from './UserContext'
import Button from 'react-bootstrap/Button'

const Landing = () => {

    const value = useContext(UserContext)
    console.log('USER CONTEXT: ', value)
    return(
        <>
            <div className = "landing-body">
                <div className = "landing-container">
                    <div className = "landing-section landing-section-left">
                        <h1 className = "landing-title">Look for Cooks</h1>
                        <h2 className = "landing-tagline">Chef made food delivered to your door!</h2>   
                        <Button style={{padding: '10px', marginTop: '20px'}} onClick = {() => window.location.href="/login"} block>Login</Button>
                    </div>
                    <div className = "landing-section">
                        {/* <img className = "landing-sectionIMG" src={SVG} alt="landing" /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;