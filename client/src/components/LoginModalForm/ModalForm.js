import React from "react";

const ModalForm = () => {
  render(){
    return (
      <form action="/login" method="post">
        <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" name="email"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password"/>
        </div>
        <button type="submit" className="btn btn-warning btn-lg">Login</button>
    </form>
      )
  }

}

export default ModalForm;