import React from "react";
import LoginModal from "../LoginModal";
import { Link } from 'react-router-dom';

const Header = () =>
  <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link to="/" className="navbar-brand">Cali.Cool</Link>
      </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li> 
          <Link to="/user/:id">My Account<span className="sr-only">(current)</span></Link>
          </li>
          <li>
            <Link to="/login" >Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
            </li>
          <li>
            <Link to="/signup">Signup</Link>
            </li>
          <li>
            <Link to="/publish">Publish</Link>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

export default Header;
