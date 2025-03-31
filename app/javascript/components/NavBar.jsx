import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Research Dashboard</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        {/* Add more navigation links as needed */}
      </div>
      <div className="nav-auth">
        {/* This assumes you have a current_user in your rails app */}
        <a href="/users/sign_out" data-method="delete" className="logout-button">
          Logout
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
