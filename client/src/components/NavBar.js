import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/NavBar.css'
import axios from 'axios'

function NavBar({ active, cook, setAuthentication, authenticated, setIdentification}) {
  const homeID = "home-item"
  const cooksID = "cooks-item"
  const jobPostingsID = "job-postings-item"
  const profileID = "profile-item"
  const menuID = "menu-page"
  const logout = "logout-link"

  const handleLogout = async (event) => {
    event.preventDefault();
    let response = axios.get('/logout');
    setIdentification('');
    setAuthentication(false)
    console.log('logout event')
  }

  console.log(active)
    return (
        <div className = 'nav-bar-overlay'>
          { authenticated ? 
                <div className = 'nav-bar' id = "authenticated-nav-bar">
                    <ul>
                      <li className={active === homeID ? `${homeID} active` : `${homeID}`}><Link to ="/home">Home</Link></li> 
                      {cook ? <></> : <li className={active === menuID ? `${menuID} active` : `${menuID}`}><Link to ="/menu">Menu</Link></li> }
                      {cook ? <></> : <li className={active === cooksID ? `${cooksID} active` : `${cooksID}`}><Link to ="/cooks">Cooks</Link></li>}
                      {cook ? <li className={active === jobPostingsID ? `${jobPostingsID} active` : `${jobPostingsID}`}><Link to ="/job-postings">Job Postings</Link></li> : <></>}
                      <li className={active === profileID ? `${profileID} active` : `${profileID}`}>
                        <Link to ="/profile">Profile</Link>
                      </li> 
                      <li className="logout-link">
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                </div>
            :
                <div className = 'nav-bar' id = "unauthenticated-nav-bar">
                    <ul>
                      <li>
                        <Link to ="/login">Login</Link>
                      </li>
                      <li>
                        <Link to ="/register">Register</Link>
                        </li>
                    </ul>
                </div>
          }
        </div>
    )
}

export default NavBar
