import React from "react";
import LoginModal from "../LoginModal";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';

const Header = () =>
 <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Cali.Cool</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} >
          <Link to="/user/:id">My Account</Link>
        </NavItem>
        <NavItem eventKey={2} >
           <Link to="/publish">Publish</Link>
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} > 
          <Link to="/signup">Signup</Link>
        </NavItem>
        <NavItem eventKey={2} >
          <Link to="/login">Login</Link>
        </NavItem>
        <NavItem eventKey={3}> 
          <Link to="/logout">Logout</Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

export default Header;
