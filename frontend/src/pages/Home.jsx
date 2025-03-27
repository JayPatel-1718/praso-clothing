import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { FiPenTool, FiCamera, FiGift, FiShield, FiTruck, FiHeadphones, FiMail, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'; // Import icons
import './Home.css';

function Home() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const featuredProducts = [
    { id: 1, name: 'Classic T-Shirt', price: 19.99, image: 'https://via.placeholder.com/300x400?text=Classic+T-Shirt' },
    { id: 2, name: 'Denim Jeans', price: 49.99, image: 'https://via.placeholder.com/300x400?text=Denim+Jeans' },
    { id: 3, name: 'Hooded Sweatshirt', price: 39.99, image: 'https://via.placeholder.com/300x400?text=Hooded+Sweatshirt' },
  ];

  const handleStyleQuiz = () => {
    alert('Style Quiz coming soon!');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  // Animation variants for fade-in effect
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="home-page">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Perfect Style</h1>
          <p>Elevate your wardrobe with Praso’s curated fashion collections.</p>
          <button className="hero-cta" onClick={() => navigate('/shop')}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Take a Style Quiz Section */}
      <section className="style-quiz-section">
        <h2>Find Your Style</h2>
        <p>Take our style quiz to discover personalized fashion recommendations.</p>
        <button className="style-quiz-cta" onClick={handleStyleQuiz}>
          Take the Quiz
        </button>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
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

      {/* Our Features Section */}
      <motion.section
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Our Features</h2>
        <div className="features-grid">
          <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <FiPenTool className="feature-icon" />
            <h3>Custom Designs</h3>
            <p>Create your own unique style with our custom design tools.</p>
          </motion.div>
          <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <FiCamera className="feature-icon" />
            <h3>Virtual Fitting Room</h3>
            <p>Try before you buy with our virtual fitting room technology.</p>
          </motion.div>
          <motion.div className="feature-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <FiGift className="feature-icon" />
            <h3>Rewards Program</h3>
            <p>Earn points with every purchase and redeem exclusive rewards.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="why-choose-us-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Why Choose Us</h2>
        <div className="why-choose-us-content">
          <motion.div className="reason" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <FiShield className="reason-icon" />
            <h3>Quality Assurance</h3>
            <p>We source only the finest materials for lasting durability.</p>
          </motion.div>
          <motion.div className="reason" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <FiTruck className="reason-icon" />
            <h3>Fast Shipping</h3>
            <p>Get your orders delivered quickly, anywhere in the world.</p>
          </motion.div>
          <motion.div className="reason" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <FiHeadphones className="reason-icon" />
            <h3>24/7 Support</h3>
            <p>Our team is here to assist you anytime, day or night.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Section */}
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
            <h3>Stay Updated</h3>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Your Email" required />
              <button type="submit">
                <FiMail />
              </button>
            </form>
            <h3>Follow Us</h3>
            <div className="social-links">
              <motion.a href="#" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                <FiFacebook />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                <FiInstagram />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                <FiTwitter />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Praso Clothing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;