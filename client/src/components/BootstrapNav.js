import React, { useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import '../styles/NavBar.css'
import axios from 'axios'

function BootstrapNav({user}) {

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
                                <Nav.Link className={active === '/home' ? "active" : ""} href ="/home">Home</Nav.Link>
                                <Nav.Link className={active === '/profile' ? "active" : ""} href ="/profile">Profile</Nav.Link>
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
