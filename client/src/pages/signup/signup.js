import React, { Component } from "react";

const Signup = () => {
  render() {
    return (
      <form action="/api/signup" method="POST">
         <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" name="email" />
        </div>
        <div className="form-group">
            <label>Create Username</label>
            <input type="text" className="form-control" name="username" />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" />
        </div>
        <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" className="form-control" name="passwordConfirm" />
        </div>

        <button type="submit" className="btn btn-warning btn-lg">Signup</button>
      </form>

      )
  }

}

export default Signup;