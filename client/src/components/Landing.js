import React, {useContext} from 'react';
import {UserContext} from './UserContext'
import Button from 'react-bootstrap/Button'
import {LandingBody, LandingContainer, LandingDescription, LandingTitle, LandingTagline, LandingSection} from './Landing/LandingStyles'

const Landing = () => {

    const value = useContext(UserContext)
    console.log('USER CONTEXT: ', value)
    return(
        <>
            <LandingBody>
                <LandingContainer>
                    <LandingDescription>
                        <LandingTitle>Look for Cooks</LandingTitle>
                        <LandingTagline>Chef made food delivered to your door!</LandingTagline>   
                        <Button style={{padding: '10px', marginTop: '20px'}} onClick = {() => window.location.href="/login"} block>Login</Button>
                    </LandingDescription>
                    <LandingSection>
                        {/* <img className = "landing-sectionIMG" src={SVG} alt="landing" /> */}
                    </LandingSection>
                </LandingContainer>
            </LandingBody>
        </>
    );
};

export default Landing;