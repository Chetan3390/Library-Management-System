import React from 'react';

const Home = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: 'calc(100vh - 140px)', // Adjust this value due to header/footer height
        backgroundImage: 'url(/Library.jpg)',  //Image is in the public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white'
      }}
    >
      <h1 className="text-center">Welcome to the Library Management System</h1>
    </div>
  );
};

export default Home;
