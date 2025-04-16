import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../style/Navbar.css';

const Navbar = () => {
  const { authData, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Blog-Verse</Link>
      </div>
      <div className="navbar-right">
        {!authData ? (
          <>
            <Link to="/login" className="navbar-link navbar-btn">Login</Link>
            <Link to="/signup" className="navbar-link navbar-btn">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="navbar-welcome">
              Hi, {authData.userName}
            </Link>
            <Link to="/create-blog" className="navbar-link navbar-btn">Create Blog</Link>
            <button className="navbar-link navbar-btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
