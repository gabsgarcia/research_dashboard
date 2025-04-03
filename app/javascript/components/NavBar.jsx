import React from 'react';

/**
 * Navigation bar component that displays at the top of the application.
 * Includes links to different sections and user actions.
 */
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Application brand/logo */}
        <a className="navbar-brand fw-bold" href="/">
          <i className="bi bi-clipboard-data me-2"></i>
          Research Dashboard
        </a>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible navbar content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Main navigation links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/dashboard">
                <i className="bi bi-house-door me-1"></i>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/api/favorites">
                <i className="bi bi-star me-1"></i>
                Favorites
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/metrics">
                <i className="bi bi-graph-up me-1"></i>
                Metrics
              </a>
            </li>
          </ul>

          {/* User menu */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-1"></i>
                Account
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <a className="dropdown-item" href="/users/edit">
                    <i className="bi bi-gear me-1"></i>
                    Settings
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  {/* Sign out link - uses Rails data-method pattern for DELETE request */}
                  <a
                    className="dropdown-item"
                    href="/users/sign_out"
                    data-method="delete"
                    rel="nofollow"
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Sign Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
