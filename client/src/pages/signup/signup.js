import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class Signup extends Component {
  
  state = {
    firstName: "",
    lastName: "",
    userName:"",
    email: "",
    passWord: ""
  };

   handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser({
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      username:this.state.userName,
      email:this.state.email,
      password:this.state.passWord
    })
    .then(res => {
      
      // window.location.href = "http://localhost:3000/";
      console.log(res)})
    .catch(err => console.log(err));

  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
           <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
              type="text" 
              className="form-control" 
              name="firstName"
              onChange={this.handleInputChange}
              value={this.state.firstName} />
          </div>
          <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
              type="text" 
              className="form-control" 
              name="lastName"
              onChange={this.handleInputChange}
              value={this.state.lastName} />
          </div>
           <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
              type="text" 
              className="form-control" 
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email} />
          </div>
          <div className="form-group">
              <label htmlFor="userName">Create Username</label>
              <input 
              type="text" 
              className="form-control" 
              name="userName"
              onChange={this.handleInputChange}
              value={this.state.userName}  />
          </div>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
              type="password" 
              className="form-control" 
              name="passWord"
              onChange={this.handleInputChange}
              value={this.state.passWord}  />
          </div>
          <button type="submit" className="btn btn-warning btn-lg">Signup</button>
        </form>
        <hr/>
        <p>Already have an account? 
        <Link to="/login">Login</Link></p>
        <p>Or go <Link to="/">home</Link>.</p>
    </div>
      )
  }

}

export default Signup;