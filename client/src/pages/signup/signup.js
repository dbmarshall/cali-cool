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
    defaultProfilePhoto: "ucb/placeholder-profilephoto",
    authenticationError: ""
  }

   handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

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
      this.setState({
        authenticationError: ""
      })
      window.location.href = res.data.successRedirect;
    })
    .catch(err => {
      this.setState({
        authenticationError: err.response.data.errMessage
      })
    });
  }

  render() {
    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>Sign Up</h1>
                </div>
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                    {/* start page content*/}

                      { this.state.authenticationError &&
                         <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> &nbsp;
                            <span className="sr-only">Error:</span>
                             {this.state.authenticationError}
                          </div>
                        </div>
                      }
                      <div className="row">
                        <div className="col-sm-8">

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
                            <button type="submit" className="btn btn-primary">Signup</button>
                        
                          </form>

                          <hr/>

                          <p>Already have an account? &nbsp; 
                          <Link to="/login">Login</Link></p>

                          <p>Or go the <Link to="/">home</Link> page.</p>

                        </div>
                      </div>

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