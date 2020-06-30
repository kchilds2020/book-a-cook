import React, { useEffect, useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import silhouette from '../images/silhouette.png'
import '../styles/NavBar.css'
import axios from 'axios'
import {UserContext} from './UserContext'

function BootstrapNav() {

    let {user, menu} = useContext(UserContext)
    console.log('NAV USER CONTEXT', user, menu)

    const active = window.location.pathname

    const logout = e => {
        e.preventDefault()
        localStorage.removeItem('user')
        axios.get('/logout')
        window.location.href = '/'
    }

    const login = e => {
        e.preventDefault()
        window.location.href = '/login'
    }
    return (
        <div className = 'nav-bar-overlay'>
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="xl">
                <Navbar.Brand href="/">Book A Cook</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end">
                        {user === null ? 
                            <>
                                
                                <Nav.Link className={active === '/cooks' ? "active" : ""} href ="/cooks">Hire a Cook</Nav.Link>
                                <Nav.Link className={active === '/job-postings' ? "active" : ""} href ="/job-postings">Apply for Jobs</Nav.Link>
                                <Nav.Link className={active === '/menu' ? "active" : ""} href = "/menu">Menu</Nav.Link>
                                {/* <Nav.Link className={active === '/login' ? "active" : ""} href ="/login">Login</Nav.Link> */}
                                <Button variant="outline-primary" onClick={login} style={{margin: "0px 20px"}}>Login</Button>
                            </> :
                            <>
                                <Nav.Link className={active === '/profile' ? "active" : ""} href ="/profile">
                                    {user.firstName} {user.lastName}
                                    <img src={user === null ? `${silhouette}` : `/api/get/image/${user.picture}`} style={{width: '25px', height: '25px', borderRadius: '10px', margin: '0px 0px 0px 16px'}}  />
                                    
                                </Nav.Link>
                                <Nav.Link className={active === '/home' ? "active" : ""} href ="/home">Home</Nav.Link>
                                <Nav.Link className={active === '/cooks' ? "active" : ""} href ="/cooks">Hire a Cook</Nav.Link>
                                <Nav.Link className={active === '/job-postings' ? "active" : ""} href ="/job-postings">Apply for Jobs</Nav.Link>
                                <Nav.Link className={active === '/menu' ? "active" : ""} href="/menu">Menu</Nav.Link>
                                <NavDropdown.Divider />
                                <Button variant="outline-danger" onClick={logout} style={{margin: "0px 20px"}}>Logout</Button>
                            </>
                            }
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default BootstrapNav