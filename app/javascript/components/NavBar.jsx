import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Research Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/metrics">Metrics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
