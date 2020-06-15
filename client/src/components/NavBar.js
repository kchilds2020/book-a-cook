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
                  <Link to ="/cooks">Cooks</Link>
                </li> 
                <li>
                  <Link to ="/job-postings">Job Postings</Link>
                </li> 
                <li>
                  <Link to ="/profile">Profile</Link>
                </li> 
              </ul>
          </div>
        </div>
    )
}

export default NavBar
