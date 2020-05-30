import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <div className = 'nav-bar-overlay'>
            <div className = 'nav-bar' id = "authenticated-nav-bar">
              <ul>
                 <li>
                  <Link to ="/home">Home</Link>
                </li> 
                <li>
                  <Link to ="/home/job-postings">Job Postings</Link>
                </li> 
                <li>
                  <Link to ="/home/profile">Profile</Link>
                </li> 
              </ul>
          </div>
        </div>
    )
}

export default NavBar
