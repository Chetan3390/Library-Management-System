import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Library Management System. All Rights Reserved.
        </p>
        <div>
          <button className="btn btn-link" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="btn btn-link" onClick={() => navigate('/about')}>
            About Us
          </button>
          <button className="btn btn-link" onClick={() => navigate('/contact')}>
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
