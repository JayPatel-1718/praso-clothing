import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import '../App.css';

function Shop() {
  const { addToCart } = useContext(CartContext);

  // Static product data
  const products = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 19.99,
      description: 'A comfortable classic t-shirt made from 100% cotton.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Denim Jeans',
      price: 49.99,
      description: 'Stylish denim jeans with a slim fit.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Hooded Sweatshirt',
      price: 39.99,
      description: 'Warm and cozy hooded sweatshirt for chilly days.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrapper">
        <h1>Shop</h1>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;