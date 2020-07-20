import React, {useContext} from 'react';
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'
import {LandingBody, LandingContainer, LandingDescription, LandingTitle, LandingTagline, LandingSection, LandingOverlay} from './LandingStyles'

const Landing = () => {

    const value = useContext(UserContext)
    console.log('USER CONTEXT: ', value)
    return(
        
            <LandingBody>
                <LandingOverlay>
                <LandingContainer>
                    <LandingDescription>
                        <LandingTitle>Look for Cooks</LandingTitle>
                        <LandingTagline>Homemade made food delivered to your door!</LandingTagline>   
                        <Button style={{padding: '10px', marginTop: '20px', borderRadius: '100px'}} onClick = {() => window.location.href="/login"} block>Login</Button>
                    </LandingDescription>
                    <LandingSection>
                        {/* <img className = "landing-sectionIMG" src={SVG} alt="landing" /> */}
                    </LandingSection>
                </LandingContainer>
                </LandingOverlay>
            </LandingBody>
    );
};

export default Landing;