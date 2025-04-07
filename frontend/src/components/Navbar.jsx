import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    alert('Search functionality coming soon!');
  };

  const handleUserClick = () => {
    if (!user) {
      navigate('/signin');
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>PRASO</h2>
      </div>
      <ul className="navbar-links">
        <li><a href="/" className={window.location.pathname === '/' ? 'active' : ''}>Home</a></li>
        <li><a href="/shop" className={window.location.pathname === '/shop' ? 'active' : ''}>Shop</a></li>
        <li><a href="/about" className={window.location.pathname === '/about' ? 'active' : ''}>About</a></li>
        <li><a href="/contact" className={window.location.pathname === '/contact' ? 'active' : ''}>Contact</a></li>
        <li><a href="/custom-design" className={window.location.pathname === '/custom-design' ? 'active' : ''}>Custom Design</a></li>
      </ul>
      <div className="navbar-icons">
        <span className="icon search-icon" onClick={handleSearch} title="Search">
          <FiSearch />
        </span>
        <div className="user-container" onClick={handleUserClick}>
          <span className="icon user-icon" title={user ? user.username : 'Account'}>
            {user ? (
              <div className="user-info">
                <img
                  src={user.pfp || 'https://via.placeholder.com/30?text=PFP'}
                  alt="Profile"
                  className="user-pfp"
                />
              </div>
            ) : (
              '👤'
            )}
          </span>
          {user && isDropdownOpen && (
            <div className="user-dropdown">
              <ul>
                <li onClick={() => { navigate('/account-settings'); setIsDropdownOpen(false); }}>
                  Account Settings
                </li>
                <li onClick={() => { navigate('/rewards'); setIsDropdownOpen(false); }}>
                  Rewards
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
        <span className="icon cart-icon" onClick={() => navigate('/cart')} title="Cart">
          <FiShoppingBag />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;