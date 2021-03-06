import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import dota2_icon from "../../images/dota2-icon.jpg"

function Navigation(props) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand to="/hello" className="nav-link active"><img src={dota2_icon} className="dotaicon" alt="dota2icon"/> Dota 2 Pro Matches Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="mr-4">Home</NavLink>
                        <NavLink to="/teams">Teams</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;