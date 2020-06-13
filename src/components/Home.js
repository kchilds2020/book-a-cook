import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'
import '../styles/Home.css'
import {Link} from 'react-router-dom'
import '../App.css'
import axios from 'axios';



const Home = ({identification, firstname, lastname, email, username}) => {
    const [myPosts, setMyPosts] = useState('');

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

     const showCount = (event) => {
        let list = document.getElementById(`list-${event.target.id}`)
        if(list !== null){
            list.style.visibility = list.style.visibility === 'visible' ? 'hidden' : 'visible'
            list.style.height = list.style.visibility === 'visible' ? 'auto' : '0px'
        }
     }

    return(
        <div>
            <NavBar />
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
                <div className = "jobs-applied-container">
                    <div className="jobs-applied-header">
                        <h3>You have 0 upcoming events.</h3>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;