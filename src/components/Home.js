import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import '../styles/Home.css'

import '../App.css'
import axios from 'axios';



const Home = ({identification}) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [myPosts, setMyPosts] = useState('');


   useEffect(() => {
       if(identification !== ''){
            axios.get(`/api/get/userid/${identification}`)
            .then(response => {
                console.log('HOME REQUEST',response.data)
                setFirstname(response.data.firstName)
                setLastname(response.data.lastName)
                setEmail(response.data.email)
                setUsername(response.data.username)
            })
        }
    },[identification])

    useEffect(() => {
        if(username !== ''){
             //get all posts
             axios.get(`/api/get/my-jobs/${username}`)
             .then(response => {
                 console.log('MY POSTS',response.data)
                 setMyPosts(response.data);
             })
         }
     },[username])

    return(
        <div>
            <NavBar />
            <div className="home-container">
                <div className = "greeting"><h2>Hello {firstname}!</h2></div>
                {/* <div className="profile-info">
                    profile info
                </div> */}
                <div className = "job-post-container">
                    <div className="job-post-header">
                        <h3>You have <span className="post-num">{myPosts.length}</span> posted Jobs.</h3>
                    </div>
                    <div className="profile-job-posts">
                        {myPosts.length > 0 ? myPosts.map((element,index) => 
                        
                        <h4 key = {index} className="sum-container">
                            <div className ="summary">
                                {element.summary}
                            </div>
                            <div className ="applications">
                                0 chefs applied
                            </div>
                        </h4>) : <h4>You have no job posts!</h4>}
                    </div>
                </div>
                <div className = "jobs-applied-container">
                    <div className="jobs-applied-header">
                        <h3>You have 0 jobs applied and 0 jobs approved.</h3>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;