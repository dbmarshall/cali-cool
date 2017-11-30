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
      <a className="navbar-brand" href="/">Cali.Cool</a>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><a href="/user/:id">My Account<span className="sr-only">(current)</span></a>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
          </li>
        <li>
          <a href="/signup">Signup</a>
          </li>
        <li>
          <a href="/publish">Publish</a>
          </li>
      </ul>
    </div>
  </div>
</nav>
  <LoginModal />
</div>

export default Header;
