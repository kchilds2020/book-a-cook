import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import silhouette from '../images/silhouette.png'
import axios from 'axios'
import {UserContext} from './UserContext'
import {NavBarOverlay} from './GeneralStyles'
import brand from '../images/hat.png'

function BootstrapNav() {

    let {user, menu} = useContext(UserContext)
    console.log('NAV USER CONTEXT', user, menu)

    const active = window.location.pathname

    const logout = e => {
        e.preventDefault()

        try{      
            axios.get('/logout')
            localStorage.removeItem('user')
            window.location.href = '/'
        }catch(error){
            alert(error)
        }
    }

    const login = e => {
        e.preventDefault()
        window.location.href = '/login'
    }
    return (
        <NavBarOverlay>
            <Navbar collapseOnSelect bg="white" variant="light" expand="xl">
                <Navbar.Brand href="/home"><img style={{width: '30px', height: '30px'}} src={brand} alt='chefhat'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end">
                        {!user ? 
                            <>
                                
                                <Nav.Link className={active === '/cooks' ? "active" : ""} href ="/cooks">Hire a Cook</Nav.Link>
                                <Nav.Link className={active === '/menu' ? "active" : ""} href = "/menu">Menu</Nav.Link>
                                {/* <Nav.Link className={active === '/login' ? "active" : ""} href ="/login">Login</Nav.Link> */}
                                <Button variant="primary" onClick={login} style={{margin: "0px 20px"}}>Login</Button>
                            </> :
                            <>
                                <Nav.Link className={active === '/profile' ? "active" : ""} href ="/profile">
                                    Profile
                                    <img src={user.picture === '' ? `${silhouette}` : `/api/get/image/${user.picture}`} style={{width: '25px', height: '25px', borderRadius: '50px', margin: '0px 0px 0px 16px', objectFit: 'cover'}} alt = "profile img" />
                                    
                                </Nav.Link>
                                <Nav.Link className={active === '/home' ? "active" : ""} href ="/home">Home</Nav.Link>
                                <Nav.Link className={active === '/cooks' ? "active" : ""} href ="/cooks">Hire a Cook</Nav.Link>
                                {user.cook ? <Nav.Link className={active === '/job-postings' ? "active" : ""} href ="/job-postings">Apply for Jobs</Nav.Link> : <></>}
                                <Nav.Link className={active === '/menu' ? "active" : ""} href="/menu">Menu</Nav.Link>
                                <NavDropdown.Divider />
                                <Button variant="danger" onClick={logout} style={{margin: "0px 20px"}}>Logout</Button>
                            </>
                            }
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </NavBarOverlay>
    )
}

export default BootstrapNav
