import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
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
            <LinkContainer to="/login">
              <NavItem 
              eventKey={2}
              onClick={this.showModal}
              >Login</NavItem>
            </LinkContainer>
            <LinkContainer to="/logout">
              <NavItem eventKey={3}>Signup</NavItem>
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
          <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Some Content here</p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
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
