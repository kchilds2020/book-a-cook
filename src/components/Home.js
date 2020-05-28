import React from 'react';
import Filter from './Filter'
import Cooks from './Cooks'
import SideBar from './SideBar'

import '../App.css'


const Home = () => {

    return(
        <div>
            <div className = "container">
                <Filter />
                <Cooks />

            </div>
            <SideBar />
        </div>
    );
};

export default Home;