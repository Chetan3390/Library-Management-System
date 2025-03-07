import React from 'react';

const Contact = () => {
  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center">Contact Us</h2>
          <p className="card-text">
            You can reach us via the following methods:
          </p>
          <p className="card-text">
            <strong>Email:</strong>
            <a href="mailto:cognizant@librarysystem.com" className="ms-1">cognizant@librarysystem.com</a>
          </p>
          <p className="card-text">
            <strong>Phone:</strong> +91 9988776655
          </p>
          <p className="card-text">
            <strong>Address:</strong> Pheonix H04, HiTech City, Hyderabad, Telangana, India.
          </p>
          <p className="card-text">
            <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
