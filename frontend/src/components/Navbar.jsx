import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi'; // Import SVG icons
import './Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    alert('Search functionality coming soon!'); // Placeholder for search
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
        <span className="icon user-icon" onClick={() => navigate('/login')} title="Account">
          <FiUser />
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