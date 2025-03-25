import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCog, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar({ user, setUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Praso</Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Main Navigation */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/policies">Policies</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Account Section */}
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

        {/* Dropdown */}
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
