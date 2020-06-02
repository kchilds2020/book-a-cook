import React from 'react';
import Filter from './Filter'
import Cooks from './Cooks'
import NavBar from './NavBar'
import '../styles/Home.css'

import '../App.css'


function showPosition(position){
    console.log(`Latitude: ${position.coords.latitude}`);
    console.log(`Longitude: ${position.coords.longitude}`);
}

const Home = () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
       console.log("Geolocation is not supported by this browser.");
    }

    return(
        <div>
            <NavBar />
            <div className = "home-container">
                <Filter />
                <Cooks />

            </div>
        </div>
    );
};

export default Home;