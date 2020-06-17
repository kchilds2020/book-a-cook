import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import '../styles/Home.css'
import '../App.css'
import axios from 'axios';
import Event from './Event'
import HomeJobPost from './HomeJobPost'



const Home = ({identification, firstname, lastname, email, username}) => {
    const [myPosts, setMyPosts] = useState('');
    const [events, setEvents] = useState('');

    useEffect(() => {
        if(username !== ''){
             //get all posts
             axios.get(`/api/get/my-jobs/${username}`)
             .then(response => {
                 console.log('MY POSTS',response.data)
                 setMyPosts(response.data);
             })
             //get working events
             axios.get(`/api/get/working-events/${username}`)
             .then(response => {
                 console.log('WORKING EVENTS',response.data)
                 let sorted = response.data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                 setEvents(sorted);
             })
             
         }
     },[username])

     

    return(
        <div>
            <NavBar active={'home-item'}/>
            <div className = "greeting"><h2>Hello {firstname}!</h2></div>
            <div className="home-container">
                <div className = "job-post-container">
                    <div className="job-post-header">
                        <h3>You have <span className="post-num">{myPosts.length}</span> posted Jobs.</h3>
                    </div>
                    <div className="profile-job-posts">
                        {myPosts.length > 0 ? myPosts.map((element,index) => <HomeJobPost key ={index} summary={element.summary} applications={element.applications} listID = {index} postID = {element._id} cook={element.cook}/>) : <></>}
                    </div>
                </div>
                <div className = "events-container">
                    <div className="events-header">
                        <h3>You have <span className="post-num">{events.length}</span> upcoming events.</h3>
                    </div>
                    
                    {events.length > 0 ? events.map((element, index) => <Event key={index} summary={element.summary} description={element.description} location={element.location} date={element.date}/>) : <></>}
                </div>

            </div>
        </div>
    );
};

export default Home;