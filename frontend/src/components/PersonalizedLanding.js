import React from 'react';
import { useLocation } from 'react-router-dom'; // To access quiz results
import './PersonalizedLanding.css';

function PersonalizedLanding() {
  const location = useLocation();
  const { q1, q2 } = location.state || {}; // Destructure quiz answers
  
  const recommendedProducts = [
    // A mock list of products for demonstration purposes
    { id: 1, name: 'Vibrant Red Jacket', category: 'Streetwear', colorPalette: 'Bold & Vibrant' },
    { id: 2, name: 'Soft Pastel Hoodie', category: 'Casual', colorPalette: 'Pastel & Soft' },
    { id: 3, name: 'Earthy Brown Blazer', category: 'Formal', colorPalette: 'Earthy & Natural' },
    { id: 4, name: 'Minimalist Monochrome Tee', category: 'Athleisure', colorPalette: 'Monochrome' }
  ];

  // Filter products based on quiz answers
  const featuredProducts = recommendedProducts.filter(product =>
    (product.category === q2 || product.colorPalette === q1)
  );

  return (
    <div className="personalized-landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Your Personalized Style</h1>
          <p>Based on your preferences, here are some recommendations!</p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.category} - {product.colorPalette}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PersonalizedLanding;
