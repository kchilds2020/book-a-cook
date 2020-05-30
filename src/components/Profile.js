import React from 'react'
import {Link} from 'react-router-dom';
import NavBar from './NavBar'

function Profile() {
    return (
        <div>
        <NavBar />
         <div className = "container">
            Profile
        </div>
            <div className = "side-nav" id="side-navigation">
                <Link to ="/home">
                        <button>Cooks</button>
                </Link> 
                <Link to ="/home/job-postings">
                        <button>Job Postings</button>
                </Link> 
                <Link to ="/home/profile">
                        <button id = "active">Profile</button>
                </Link> 
            </div>
        </div>
    )
}

export default Profile
