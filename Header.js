import React from 'react';
import logo from './logo.png';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img id="logo" src={logo} alt="Logo" />Flybnb</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Become a Host</Nav.Link>
            <NavDropdown title="Signup" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Signup</NavDropdown.Item>
              <NavDropdown.Item href="#">Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Host your experience</NavDropdown.Item>
              <NavDropdown.Item href="#">Host your place</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header