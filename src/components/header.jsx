import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = ({ user }) => {
  return ( <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <span className="navbar-brand">Movies App</span>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">Customers</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About Us</NavLink>
        </li>  
      </ul>
    </div>
        {!user && <ul className="navbar-nav"><li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </li></ul>}
        {user && <ul className="navbar-nav"><li className="nav-item">
          <NavLink className="nav-link" to="/me">{user.name}</NavLink>
        </li>
        <li className="nav-item">
             <NavLink className="nav-link" to="/logout">Logout</NavLink>
          </li></ul>}        
  </div>
</nav> );
}
 
export default Header;
