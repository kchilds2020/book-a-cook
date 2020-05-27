import React from 'react';
import PIC from '../images/pic.jpeg';

const container = {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
}

const profile = {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: '8px',
    maxWidth: '700px',
    margin: '10px',
    padding: '20px',
    boxShadow: '2px 2px 4px black'
}

const pictureDiv = {
    height: '100px',
    width: '100px',
}
const picture ={
    height: '100%',
    borderRadius: '10px'
}

const Home = () => {
    return(
        <div>
            <h1>HOME</h1>
            <div style = {container}>
                <div style = {profile}>
                    <div style={pictureDiv}>
                        <img src={PIC} style = {picture} alt='profile pic'/>
                    </div>
                    <h2>Kevin Childs</h2>
                    <h3>Lorem ipsum dolor sit amet.</h3>
                    <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa optio animi laboriosam quaerat dolorum laborum nobis vitae alias blanditiis suscipit.</div>
                </div>
                <div style = {profile}>
                    <div style={pictureDiv}>
                        <img src={PIC} style = {picture} alt='profile pic'/>
                    </div>
                    <h2>Kevin Childs</h2>
                    <h3>Lorem ipsum dolor sit amet.</h3>
                    <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa optio animi laboriosam quaerat dolorum laborum nobis vitae alias blanditiis suscipit.</div>
                </div>
                <div style = {profile}>
                    <div style={pictureDiv}>
                        <img src={PIC} style = {picture} alt='profile pic'/>
                    </div>
                    <h2>Kevin Childs</h2>
                    <h3>Lorem ipsum dolor sit amet.</h3>
                    <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa optio animi laboriosam quaerat dolorum laborum nobis vitae alias blanditiis suscipit.</div>
                </div>
                <div style = {profile}>
                    <div style={pictureDiv}>
                        <img src={PIC} style = {picture} alt='profile pic'/>
                    </div>
                    <h2>Kevin Childs</h2>
                    <h3>Lorem ipsum dolor sit amet.</h3>
                    <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa optio animi laboriosam quaerat dolorum laborum nobis vitae alias blanditiis suscipit.</div>
                </div>
                
            </div>
        </div>
    );
};

export default Home;