import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import '../styles/Home.css'

import '../App.css'
import axios from 'axios';



const Home = ({identification}) => {
    const [firstname, setFirstname] = useState('');


   useEffect(() => {
       if(identification !== ''){
            axios.get(`/api/get/userid/${identification}`)
            .then(response => {
                console.log('HOME REQUEST',response.data)
                setFirstname(response.data.firstName)
            })
        }
    },[identification])

    return(
        <div>
            <NavBar />
            <div className="home-container">
                <div className = "greeting"><h2>Hello {firstname}!</h2></div>
                <div className="profile-info">
                    profile info
                </div>
                <div className="profile-job-posts">
                    your job posts
                </div>


            </div>
        </div>
    );
};

export default Home;