import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import '../styles/Home.css'
import {Link} from 'react-router-dom'
import '../App.css'
import axios from 'axios';
import Event from './Event'



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
                 setEvents(response.data);
             })
             
         }
     },[username])

     const showCount = (event) => {
        let list = document.getElementById(`list-${event.target.id}`)
        if(list !== null){
            list.style.visibility = list.style.visibility === 'visible' ? 'hidden' : 'visible'
            list.style.height = list.style.visibility === 'visible' ? 'auto' : '0px'
        }
     }

    return(
        <div>
            <NavBar active={'home-item'}/>
            <div className = "greeting"><h2>Hello {firstname}!</h2></div>
            <div className="home-container">
                
                {/* <div className="profile-info">
                    profile info
                </div> */}


                <div className = "job-post-container">
                    <div className="job-post-header">
                        <h3>You have <span className="post-num">{myPosts.length}</span> posted Jobs.</h3>
                    </div>
                    <div className="profile-job-posts">
                        {myPosts.length > 0 ? myPosts.map((element,index) => 
                        
                        <h4 key = {index} className="sum-container" onClick={showCount} id={`${index}`}>
                            <div className ="summary">
                                {element.summary}
                            </div>
                            <div className ="applications">
                                <button className ="count-applied" onClick={showCount} id={`${index}`}>
                                    <span className="post-num">{element.applications.length}</span> applied
                                </button>
                                <ul className="cook-list" id={`list-${index}`}>
                                    {element.applications.map((cook,index) => <li key ={index} className="cook-name"><Link to ={`/user/profile?user=${cook}`} className="links" >{cook}</Link></li>)}
                                </ul>
                            </div>
                        </h4>) : <h4>You have no job posts!</h4>}
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