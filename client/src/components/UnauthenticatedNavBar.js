import React from 'react'
import {Link} from 'react-router-dom'


function UnauthenticatedNavBar() {
    return (
        <div className = 'nav-bar-overlay'>
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
        </div>
    )
}

export default UnauthenticatedNavBar
