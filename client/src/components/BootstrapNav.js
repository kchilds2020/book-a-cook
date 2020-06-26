import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../styles/NavBar.css'

function BootstrapNav() {
    return (
        <div className = 'nav-bar-overlay'>
            <Navbar collapseOnSelect bg="light" expand="xl">
                <Navbar.Brand href="#home">Book A Cook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mr-auto">
                    <Nav.Link href ="/home">Home</Nav.Link>
                    <Nav.Link href ="/profile">Profile</Nav.Link>
                    <Nav.Link href ="/cooks">Hire a Cook</Nav.Link>
                    <Nav.Link href ="/job-postings">Apply for Jobs</Nav.Link>
                    <Nav.Link href="/menu">Menu</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default BootstrapNav
