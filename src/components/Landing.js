import React from 'react';
import {Link} from 'react-router-dom';
import SVG from '../images/SVG.svg';

const landingBody ={
    height: '90vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}
const container = {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center'
};
const section = {
    width: '500px'
}
const sectionIMG = {
    width: '100%'
}
const btn = {
    width: '150px',
    color: 'black',
    height: '50px',
    padding: '10px',
    margin: '20px 0px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#ffb9b9',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '16px'
}
const title = {
    letterSpacing: '4px',
    fontSize: '64px'
}
const tagline = {
    fontStyle: 'italic'
}

const Landing = () => {
    return(
        <div style = {landingBody}>
            <div style = {container}>
                <div style = {section}>
                    <h1 style = {title}>Book a Cook!</h1>
                    <h2 style = {tagline}>Hire Professional Chefs to cook for you at home!</h2>
                    <Link to ="/login">
                        <button style={btn}>Login</button>
                    </Link>    
                </div>
                <div style = {section}>
                    <img style = {sectionIMG} src={SVG} alt="landing" />
                </div>
            </div>
        </div>
    );
};

export default Landing;