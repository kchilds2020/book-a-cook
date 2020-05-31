import React from 'react';
import Filter from './Filter'
import Cooks from './Cooks'
import NavBar from './NavBar'

import '../App.css'


const Home = () => {

    return(
        <div>
            <NavBar />
            <div className = "container">
                <Filter />
                <Cooks />

            </div>
        </div>
    );
};

export default Home;