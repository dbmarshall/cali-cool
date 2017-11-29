import React, { Component } from "react";

class Signup extends Component{
  render() {
    return (
      <div>
        <form action="/api/signup" method="post">
           <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" name="firstName" />
          </div>
          <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" name="lastName" />
          </div>
           <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" name="email" />
          </div>
          <div className="form-group">
              <label>Create Username</label>
              <input type="text" className="form-control" name="userName" />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="passWord" />
          </div>
          <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" name="passwordConfirm" />
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