import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext'; // Adjust path if needed
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams(); // Get product ID from route if needed
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);

  // Dummy data (replace with actual product data from API or props)
  const product = {
    id,
    name: 'Classic Praso Tee',
    description:
      'A perfect everyday t-shirt made from sustainable cotton. Breathable, stylish, and built to last.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://via.placeholder.com/400x500?text=Praso+Tee' // Replace with actual image path
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart!');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      size: selectedSize,
      quantity: 1,
      image: product.image
    });
  };

  return (
    <div className="product-detail-page">
      <Navbar />

      <div className="product-detail-container">
        {/* Product Images */}
        <div className="product-images">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          {/* Size Selector */}
          <div className="size-selector">
            <label>Select Size:</label>
            <div className="size-options">
              {product.sizes.map((size) => (
                <div
                  key={size}
                  className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;
