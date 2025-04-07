// pages/Shop.js
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import './Shop.css';

const usdToInr = 80; // Add this line to convert USD to INR

function Shop() {
  const { addToCart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    { id: 1, name: "PCMY'25", price: 19.99, image: "/images/PCMY'25.jpg", category: 'T-Shirts' },
    { id: 2, name: 'Alfriceden', price: 24.99, image: '/images/Alfriceden.jpg', category: 'T-Shirts' },
    { id: 13, name: 'Where The Space?', price: 24.99, image: '/images/Where_the_space.jpg', category: 'T-Shirts' },
    { id: 3, name: 'ASTRA', price: 39.99, image: '/images/ASTRA.jpg', category: 'Sweatshirt' },
    { id: 4, name: 'Private', price: 44.99, image: '/images/PRIVATE.jpg', category: 'Sweatshirt' },
    { id: 5, name: 'DGOTTO - X1', price: 49.99, image: '/images/DGOTTO.jpg', category: 'Sweatshirt' }
    
  ];

  const categories = [...new Set(products.map(product => product.category))];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="shop-page">
      <Navbar />
      <section className="shop-section">
        <h1>Shop Our Collection</h1>

        {/* Toggle Cart Button */}
        <div className="cart-fab" onClick={() => setIsCartOpen(true)}>
          <FiShoppingCart />
        </div>

        {/* Category Buttons */}
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <div className="product-price-cart">
                <span className="product-price">
                  ₹{Math.round(product.price * usdToInr).toLocaleString('en-IN')}
                </span>
                <FiShoppingCart
                  className="add-to-cart-icon"
                  onClick={() => addToCart(product)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </div>
  );
}

export default Shop;
