import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faCog, faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';

function Navbar({ user, setUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Praso</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="account" ref={dropdownRef}>
        {user ? (
          <div className="profile-box" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
            <span className="profile-name">{user.name}</span>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          </Link>
        )}

        <FontAwesomeIcon icon={faBell} className="notifications-icon" /> {/* Additional clickable bell icon */}

        {/* Dropdown after login */}
        {dropdownOpen && user && (
          <div className="dropdown">
            <ul>
              <li><FontAwesomeIcon icon={faShoppingCart} /> <Link to="/cart">Cart</Link></li>
              <li><FontAwesomeIcon icon={faCog} /> <Link to="/account-settings">Account Settings</Link></li>
              <li><FontAwesomeIcon icon={faSignOutAlt} /> <button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
