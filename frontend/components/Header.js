
import logo from "./logo.png";
import React, { Component } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBar from "./Sidebar";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false , token : null};
  }

  componentDidMount() {
    //localStorage.clear('user');
    this.timerID = setInterval(
      () => this.timer(),
      1000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  timer() {
    if (localStorage.getItem('token').token !== null  ) {
      this.setState({
        isLoggedIn: true,
        token : localStorage.getItem('token') //.token & && localStorage.getItem('token').token !== ""
      });
    }
  }

  handleLogOut() {
    this.setState({
      isLoggedIn: false
    });
    localStorage.clear('token');
    localStorage.clear('user');
    localStorage.clear('userType');
  }

  render() {
    const imgstyle = {
      width: "30px",
      height: "30px"
    };
   let section;
   
    if (this.state.isLoggedIn && JSON.parse(localStorage.getItem('userType'))==='host') {
      section = <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
       <Nav.Link href="/reservations">Reservations</Nav.Link>
       <Nav.Link href="/favourites">Favourites</Nav.Link>
       <Nav.Link href="/properties/my">My Properties</Nav.Link>
       <Nav.Link href="/" onClick={this.handleLogOut.bind(this)}>Logout</Nav.Link>
      </Nav>
    } else if(this.state.isLoggedIn && JSON.parse(localStorage.getItem('userType'))==='user'){
      section = <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
       <Nav.Link href="/reservations">Reservations</Nav.Link>
       <Nav.Link href="/favourites">Favourites</Nav.Link>
       <Nav.Link href="/" onClick={this.handleLogOut.bind(this)}>Logout</Nav.Link>
      </Nav>
    }
    else {
      section = <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
       <Nav.Link href="/signup">Sign up</Nav.Link>
       <Nav.Link href="/login">Log in</Nav.Link>
     </Nav>
    }
    return (
      <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img id="logo" style={{marginLeft:"3rem", width:'70px', height:'70px'}} src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {section}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
    );
  }
}

export default Header;
/*
function Header() {

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img id="logo" style={{marginLeft:"3rem"}} src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {section}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SideNavBar />
    </div>
  );
}

export default Header;*/
