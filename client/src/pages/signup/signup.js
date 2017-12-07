import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class Signup extends Component {
  
  state = {
    firstName: "",
    lastName: "",
    userName:"",
    email: "",
    passWord: "",
    defaultProfilePhoto: "https://static.pexels.com/photos/258447/pexels-photo-258447.jpeg"
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
      password:this.state.passWord,
      profilePicture:this.state.defaultProfilePhoto
    })
    .then(res => {
      console.log(res.request.responseURL)
      // if (res.request.responseURL === window.location.host + "/") {
      //   // window.location.href = res.request.responseURL;
      //   console.log("successful login will redirect to /")
      // } 
      window.location.href = res.request.responseURL;
      
    })
    .catch(err => console.log(err));

  };

  render() {
    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>Cali.Cool</h1>
                  <p>A growing visual record of what's going down in our state</p>
                </div>
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                    {/* start page content*/}

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

                    <p>Or go the <Link to="/">home</Link> page.</p>

                    {/* end page content*/}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>    
        </div>

      </div>
    );
  }
}

export default Signup;