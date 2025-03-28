import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
  const navigate = useNavigate();

  const handleSearch = () => {
    alert('Search functionality coming soon!');
  };

  const handleUserClick = () => {
    if (user) {
      // If user is logged in, show logout option
      if (window.confirm('Do you want to log out?')) {
        logout();
      }
    } else {
      // If user is not logged in, navigate to sign-in page
      navigate('/signin');
    }
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
      </ul>
      <div className="navbar-icons">
        <span className="icon search-icon" onClick={handleSearch} title="Search">
          <FiSearch />
        </span>
        <span className="icon user-icon" onClick={handleUserClick} title={user ? user.username : 'Account'}>
          {user ? (
            <div className="user-info">
              <img
                src={user.pfp || 'https://via.placeholder.com/30?text=PFP'} // Placeholder PFP if none provided
                alt="Profile"
                className="user-pfp"
              />
              <span className="user-name">{user.username}</span>
            </div>
          ) : (
            '👤'
          )}
        </span>
        <span className="icon cart-icon" onClick={() => navigate('/cart')} title="Cart">
          <FiShoppingBag />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;