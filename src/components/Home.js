import React from 'react';
import Filter from './Filter'
import Cooks from './Cooks'
import NavBar from './NavBar'
import '../styles/Home.css'

import '../App.css'


const Home = () => {

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