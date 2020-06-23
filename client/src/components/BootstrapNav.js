import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

function BootstrapNav() {
    return (
        <Navbar collapseOnSelect bg="dark" expand="xl">
            <Navbar.Brand href="#home">Book A Cook</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href ="/home">Home</Nav.Link>
                <Nav.Link href ="/profile">Profile</Nav.Link>
                <Nav.Link href ="/cooks">Hire a Cook</Nav.Link>
                <Nav.Link href ="/job-postings">Apply for Jobs</Nav.Link>
                <Nav.Link href="/menu">Menu</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default BootstrapNav
