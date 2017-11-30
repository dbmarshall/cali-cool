import React from "react";
import LoginModal from "../LoginModal";

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
      <a className="navbar-brand" href="#">Cali.Cool</a>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><a href="#">My Account<span className="sr-only">(current)</span></a></li>
        <li><a data-toggle="modal" data-target="#exampleModal">Login</a></li>
        <li><a href="#">Logout</a></li>
        <li><a href="/signup">Signup</a></li>
        <li className="dropdown">
          <ul className="dropdown-menu">
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <LoginModal />
</div>

export default Header;
