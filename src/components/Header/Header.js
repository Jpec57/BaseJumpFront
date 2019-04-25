import React, {Component} from 'react';
import './Header.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <Link to="/event">
                        <img src={process.env.PUBLIC_URL + 'imgs/steam_logo.png'} alt="logo"/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="En cours" id="basic-nav-dropdown">
                            <Link to={{pathname: '/event', query: {type: 'perso', upcoming: true}}} className="link">Mes events</Link>
                            <NavDropdown.Divider/>
                            <Link to={{pathname: '/event', query: {type: 'invite', upcoming: true}}} className="link">Mes invitations</Link>
                        </NavDropdown>
                        <NavDropdown title="Passé" id="basic-nav-dropdown">
                            <Link to={{pathname: '/event', query: {type: 'perso', upcoming: false}}} className="link">Mes events</Link>
                            <NavDropdown.Divider/>
                            <Link to={{pathname: '/event', query: {type: 'invite', upcoming: false}}} className="link">Mes invitations</Link>
                        </NavDropdown>
                    </Nav>
                    <Nav.Link href='/create'>
                        <Button className="creer">Créer</Button>
                    </Nav.Link>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default Header;