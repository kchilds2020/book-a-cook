import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/SideBar.css'

function SideBar() {
    return (
        <div className = "side-nav" id="side-navigation">
                <Link to ="/home">
                        <button id = "active">Cooks</button>
                </Link> 
                <Link to ="/home/job-postings">
                        <button>Job Postings</button>
                </Link> 
                <Link to ="/home/profile">
                        <button>Profile</button>
                </Link> 
        </div>
    )
}

export default SideBar
