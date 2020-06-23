import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import '../styles/NavBar.css'
import axios from 'axios'

function NavBar({ cook, setAuthentication, authenticated, setIdentification}) {

  const [active, setActive] = useState('/home');

  const homeID = "/home"
  const cooksID = "/cooks"
  const jobPostingsID = "/job-postings"
  const profileID = "/profile"
  const menuID = "/menu"
  const logout = "logout-link"

  const handleLogout = async (event) => {
    event.preventDefault();
    let response = axios.get('/logout');
    setIdentification('');
    setAuthentication(false)
    console.log('logout event')
  }

  console.log('PATHNAME',window.location.pathname)
    return (
        <div className = 'nav-bar-overlay'>
          { authenticated ? 
                <div className = 'nav-bar' id = "authenticated-nav-bar">
                    <ul>
                      <li className={active === homeID ? `${homeID} active` : `${homeID}`}><Link to ="/home" onClick={e => setActive(homeID)}>Home</Link></li> 
                      {/* {cook ? <></> : <li className={active === menuID ? `${menuID} active` : `${menuID}`}><Link to ="/menu">Menu</Link></li> } */}
                      <li className={active === menuID ? `${menuID} active` : `${menuID}`}><Link to ="/menu" onClick={e => setActive(menuID)}>Menu</Link></li>
                      {/* {cook ? <></> : <li className={active === cooksID ? `${cooksID} active` : `${cooksID}`}><Link to ="/cooks">Cooks</Link></li>} */}
                      <li className={active === cooksID ? `${cooksID} active` : `${cooksID}`}><Link to ="/cooks" onClick={e => setActive(cooksID)}>Cooks</Link></li>
                      {/* {cook ? <li className={active === jobPostingsID ? `${jobPostingsID} active` : `${jobPostingsID}`}><Link to ="/job-postings">Job Postings</Link></li> : <></>} */}
                      <li className={active === jobPostingsID ? `${jobPostingsID} active` : `${jobPostingsID}`}><Link to ="/job-postings" onClick={e => setActive(jobPostingsID)}>Job Postings</Link></li>
                      <li className={active === profileID ? `${profileID} active` : `${profileID}`}>
                        <Link to ="/profile" onClick={e => setActive(profileID)}>Profile</Link>
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
