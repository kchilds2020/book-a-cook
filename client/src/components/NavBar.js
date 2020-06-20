import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/NavBar.css'

function NavBar({active}) {
  const homeID = "home-item"
  const cooksID = "cooks-item"
  const jobPostingsID = "job-postings-item"
  const profileID = "profile-item"

  console.log(active)
    return (
        <div className = 'nav-bar-overlay'>
            <div className = 'nav-bar' id = "authenticated-nav-bar">
              <ul>
                 <li className={active === homeID ? `${homeID} active` : `${homeID}`}>
                  <Link to ="/home">Home</Link>
                </li> 
                <li className={active === cooksID ? `${cooksID} active` : `${cooksID}`}>
                  <Link to ="/cooks">Cooks</Link>
                </li> 
                <li className={active === jobPostingsID ? `${jobPostingsID} active` : `${jobPostingsID}`}>
                  <Link to ="/job-postings">Job Postings</Link>
                </li> 
                <li className={active === profileID ? `${profileID} active` : `${profileID}`}>
                  <Link to ="/profile">Profile</Link>
                </li> 
              </ul>
          </div>
        </div>
    )
}

export default NavBar
