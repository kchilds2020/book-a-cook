import React from 'react'
import {Link} from 'react-router-dom';

function JobPostings() {
    return (
        <div>
         <div className = "container">
            JobPostings
        </div>
            <div className = "side-nav" id="side-navigation">
                <Link to ="/home">
                        <button>Cooks</button>
                </Link> 
                <Link to ="/home/job-postings">
                        <button id = "active">Job Postings</button>
                </Link> 
                <Link to ="/home/profile">
                        <button>Profile</button>
                </Link> 
            </div>
        </div>
    )
}

export default JobPostings
