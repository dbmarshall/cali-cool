import React, { Component } from "react";

class Signup extends Component{
  
  state = {
    firstName: "",
    lastName: "",
    userName:"",
    email: "",
    passWord: "",
    role:""
  };

   handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
  }
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
        <p>Already have an account? <a href="/login">Login</a></p>
        <p>Or go <a href="/">home</a>.</p>
    </div>
      )
  }

}

export default Signup;