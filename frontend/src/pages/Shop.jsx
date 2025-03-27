import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import './Shop.css';

function Shop() {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: 'Classic T-Shirt', price: 19.99, image: 'https://via.placeholder.com/300x400?text=Classic+T-Shirt' },
    { id: 2, name: 'Denim Jeans', price: 49.99, image: 'https://via.placeholder.com/300x400?text=Denim+Jeans' },
    { id: 3, name: 'Hooded Sweatshirt', price: 39.99, image: 'https://via.placeholder.com/300x400?text=Hooded+Sweatshirt' },
    { id: 4, name: 'Leather Jacket', price: 89.99, image: 'https://via.placeholder.com/300x400?text=Leather+Jacket' },
    { id: 5, name: 'Sneakers', price: 59.99, image: 'https://via.placeholder.com/300x400?text=Sneakers' },
    { id: 6, name: 'Summer Dress', price: 29.99, image: 'https://via.placeholder.com/300x400?text=Summer+Dress' },
  ];

  return (
    <div className="shop-page">
      <Navbar />
      <section className="shop-section">
        <h1>Shop Our Collection</h1>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PRASO</h3>
            <p>Elevate your style with Praso Clothing.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@prasoclothing.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Praso Clothing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Shop;