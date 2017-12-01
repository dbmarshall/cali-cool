import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Modal, Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


class Header extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
    open: false,
    userName:"",
    passWord:""
    }
  };

  showModal = event => {
    this.setState({open: true})}

  closeModal = event => {
      this.setState({ open: false })}
 
  saveAndClose = event => {
    this.setState({ open: false })};

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value
    });
    console.log(this.state.userName)
    console.log(this.state.passWord)
  }

   handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.userName)
    console.log(this.state.passWord)
    API.loginUser({
      username:this.state.userName,
      password:this.state.passWord
    })
    .then(res => {
      console.log(res);
    //   console.log(res.request.responseURL)
    //   if (res.request.responseURL === window.location.host + "/") {
    //     // window.location.href = res.request.responseURL;
    //     console.log("successful login will redirect to /")
    //   }
    //   window.location.href = res.request.responseURL;
      
    })
    // .catch(err => console.log(err));
  };


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
          <Form 
          horizontal
          onSubmit={this.handleFormSubmit}>
            <FormGroup controlId="formHorizontalUserName"
            >
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl 
                type="text" 
                placeholder="Username"
                name="userName"
                onChange={this.handleInputChange}
                value={this.state.userName}
                 />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl 
                type="password" 
                placeholder="Password"
                name="passWord"
                onChange={this.handleInputChange}
                value={this.state.passWord} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">
                  Login
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
  </div>
      )
  }


}

export default Header;
