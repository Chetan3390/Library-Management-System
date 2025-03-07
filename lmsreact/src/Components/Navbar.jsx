import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // Retrieve the token and user role from local storage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole && userRole.toLowerCase() === 'admin';

  // State to control the collapse of the navbar on small screens
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Toggle the state for the collapse (hamburger) menu
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Handle logout by clearing local storage and navigating back to home
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container">
        {/* Brand/logo link */}
        <Link className="navbar-brand" to="/">Library System</Link>
        {/* Hamburger button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links; collapse on mobile screens */}
        <div className={`${isCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          {/* Left aligned navigation items */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            {token ? (
              isAdmin ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin">Admin Panel</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/users">User Details</NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={() => navigate('/admin')}>
                      Back to Admin
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/books">My Books</NavLink>
                </li>
              )
            ) : null}
          </ul>
          {/* Right aligned navigation items */}
          <ul className="navbar-nav ms-auto">
            {token ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">User Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/login">Admin Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
