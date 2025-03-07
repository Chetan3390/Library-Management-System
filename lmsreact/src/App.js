import logo from './logo.svg';
import './App.css';

import { Link, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Books from './Components/Books';
import AdminPanel from './Components/Admin/AdminPanel';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminUsers from './Components/Admin/AdminUsers';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import './index.css';

function App() {
  return (
    <>
    {/* <div align="center">
    // <nav className='navbar navbar-expand-sm bg-light navbar-light'>
    // <div class="container-fluid">
    //   <ul className='navbar-nav'>
    //     <li className='nav-item'><Link className='nav-link' to="/login">UserLogin</Link></li>
    //     <li className='nav-item'><Link className='nav-link' to="/register">UserRegister</Link></li>
    //     <li className='nav-item'><Link className='nav-link' to="/admin">Admin Panel</Link></li>
    //     <li className='nav-item'><Link className='nav-link' to="books">Get all Books</Link></li>
    //   </ul>
    // </div>
    // </nav> */}

    
    <Navbar />
    <div style={{ padding: '20px'}}>
    <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* User books section */}
          <Route path="/books" element={<Books />} />

          {/* Admin login and admin panel */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          {/* About Us */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </div>   
    <Footer/>

    </>
  );
};

export default App;
