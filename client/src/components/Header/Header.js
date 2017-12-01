import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
    open: false
    }
  };

  showModal = event => {
    this.setState({open: true})}

  closeModal = event => {
      this.setState({ open: false })}
 
  saveAndClose = event => {
    this.setState({ open: false })};

  render(){

    return (
       <div>
     <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Cali.Cool</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/user/:id">
              <NavItem eventKey={1}>My Account</NavItem>
            </LinkContainer>
            <LinkContainer to="/publish">
              <NavItem eventKey={2}>Publish</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
           <LinkContainer to="/signup">
              <NavItem eventKey={1}>Signup</NavItem>
            </LinkContainer>
              <NavItem 
              onClick={this.showModal}
              >Login</NavItem>
            <LinkContainer to="/logout">
              <NavItem eventKey={3}>Logout</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        
      <Modal
        show={this.state.open}
        onHide={this.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id='ModalHeader'>Login into your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Going to add FORM HERE</p>
        </Modal.Body>
        <Modal.Footer>
          <button 
          className='btn btn-primary' 
          onClick={this.saveAndClose}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
  </div>
      )
  }


}

export default Header;
