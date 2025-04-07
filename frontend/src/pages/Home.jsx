import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPenTool, FiCamera, FiGift, FiShield,
  FiTruck, FiHeadphones, FiMail,
  FiFacebook, FiInstagram, FiTwitter,
  FiShoppingCart
} from 'react-icons/fi';

import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { addToCart } = useContext(CartContext);
  const { user, quizPreferences, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSideButton, setShowSideButton] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allProducts = [
    {
      id: 1,
      name: 'Angel Tee',
      price: 799,
      salePrice: 299,
      images: ['/images/back_1.png'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['white'],
      style: 'casual',
      color: 'white',
      occasion: 'everyday',
      category: 'Tees',
      description: 'A soft cotton white tee with angelic graphic art—perfect for everyday chill looks.'
    },
    {
      id: 2,
      name: 'Fate Dominant',
      price: 899,
      salePrice: 749,
      images: [
        '/images/Fate_Dominant_2.png',
        '/images/Fate_Dominant_1.png',
        '/images/Fate_Dominant_back.png',
      ],
      sizes: ['S', 'M', 'L'],
      colors: ['black'],
      style: 'casual',
      color: 'black',
      occasion: 'everyday',
      category: 'Tees',
      description: 'Dominate your fate in this dark-themed graphic tee made for statement makers.'
    },
    {
      id: 3,
      name: 'Trasher',
      price: 1199,
      salePrice: 899,
      images: [
        '/images/Trasher.jpg',
        '/images/Trasher_side.jpg',
        '/images/Trasher_back.jpg',
      ],
      sizes: ['M', 'L', 'XL'],
      colors: ['gray'],
      style: 'casual',
      color: 'gray',
      occasion: 'everyday',
      category: 'Tees',
      description: 'A rugged street-style tee with burnt texture and bold print. Not for the faint-hearted.'
    },
    {
      id: 4,
      name: 'The 77',
      price: 3499,
      salePrice: 1999,
      images: [
        '/images/Jacket_1.jpg',
        '/images/Jacket_2.jpg',
        '/images/Jacket_back.jpg',
      ],
      sizes: ['L', 'XL'],
      colors: ['black'],
      style: 'edgy',
      color: 'black',
      occasion: 'party',
      category: 'Hoodies',
      description: 'Edgy oversized jacket for the wild nights. With bold embroidery and zipped flair.'
    },
  ];

  const featuredProducts = quizPreferences
    ? allProducts.filter(product =>
        (quizPreferences.style === '' || product.style === quizPreferences.style) &&
        (quizPreferences.color === '' || product.color === quizPreferences.color) &&
        (quizPreferences.occasion === '' || product.occasion === quizPreferences.occasion)
      )
    : allProducts;

  const filteredProducts = selectedCategory === "All"
    ? featuredProducts
    : featuredProducts.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const handleScroll = () => {
      setShowSideButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home">
      <Navbar />

      {/* HERO SECTION */}
      <motion.section className="hero-section-camo" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="hero-container-camo">
          <div className="hero-left-camo">
            <h1 className="hero-title-camo">PRASO</h1>
            <p className="hero-subtitle-camo">Your street. Your rules. Let the fit do the talking.</p>
            <div className="hero-buttons-camo">
              <button className="btn-camo-primary" onClick={() => navigate('/quiz')}>Take the Quiz</button>
              <button className="btn-camo-secondary" onClick={() => navigate('/login')}>Sign In</button>
            </div>
          </div>
          <div className="hero-right-camo">
            <img src="/images/hero2.jpg" alt="Streetwear Model" className="hero-image-camo" />
          </div>
        </div>
      </motion.section>

      {/* STYLE QUIZ SECTION */}
      <motion.section className="style-quiz-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="style-quiz-card">
          <h2 className="style-quiz-heading">Ready to Own Your Style?</h2>
          <p className="style-quiz-text">Take our quick quiz to unlock your streetwear vibe — built just for you.</p>
          <motion.button
            className="style-quiz-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!user) {
                alert("You must be signed in to take the style quiz!");
                navigate("/login");
              } else {
                navigate("/quiz");
              }
            }}
          >
            🔥 Take the Quiz
          </motion.button>
        </div>
      </motion.section>

      {/* FEATURED PRODUCTS SECTION */}
      <motion.section className="featured-products-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="featured-heading">BOLD STYLE. EFFORTLESS COMFORT.</h2>
        <p className="featured-subtext">Streetwear that speaks for you — curated just for your vibe.</p>

        <div className="product-filters">
          {["All", "Hoodies", "Tees", "Bottoms", "Accessories"].map((category) => (
            <button
              key={category}
              className={`filter-button ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <motion.div
        key={product.id}
        className="product-card"
        whileHover={{ scale: 1.03 }}
        onClick={() => navigate(`/product-detail/${product.id}`)} // 🔁 Updated here
        style={{ cursor: 'pointer' }}
      >
        <div className="product-image-container">
          {product.salePrice && <span className="sale-badge">🔥 SALE</span>}
          <img src={product.images?.[0] || '/fallback.jpg'} alt={product.name} />
        </div>
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price-cart">
            {product.salePrice ? (
              <div className="sale-prices">
                <span className="original-price">₹{product.price}</span>
                <span className="sale-price">₹{product.salePrice}</span>
              </div>
            ) : (
              <span className="product-price">₹{product.price}</span>
            )}
            <FiShoppingCart
              className="add-to-cart-icon"
              onClick={(e) => {
                e.stopPropagation(); // 🛑 Prevent card click
                addToCart(product);
              }}
            />
          </div>
        </div>
      </motion.div>
    ))
  ) : (
    <p className="no-products-message">No products found in this category.</p>
  )}
</div>


        <div className="view-all-container">
          <button className="view-all-button" onClick={() => navigate('/products')}>
            View All Products
          </button>
        </div>
      </motion.section>

      {/* FEATURES */}
      <motion.section className="features-section" initial="hidden" whileInView="visible" variants={fadeInUp}>
        <h2 className="section-heading">Our Features</h2>
        <div className="features-grid">
          {[
            { icon: <FiPenTool />, title: "Custom Designs", desc: "Create your own unique style." },
            { icon: <FiCamera />, title: "Virtual Fitting Room", desc: "Try before you buy." },
            { icon: <FiGift />, title: "Rewards Program", desc: "Earn and redeem points." }
          ].map((feature, idx) => (
            <motion.div key={idx} className="feature-card" whileHover={{ scale: 1.05 }}>
              <div className="icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* WHY CHOOSE US */}
      <motion.section className="why-choose-us-section" initial="hidden" whileInView="visible" variants={fadeInUp}>
        <h2 className="section-heading">Why Choose Us</h2>
        <div className="why-choose-us-grid">
          {[
            { icon: <FiShield />, title: "Quality Assurance", desc: "Top materials only." },
            { icon: <FiTruck />, title: "Fast Shipping", desc: "Worldwide delivery." },
            { icon: <FiHeadphones />, title: "24/7 Support", desc: "We’re always here." }
          ].map((reason, idx) => (
            <motion.div key={idx} className="reason-card" whileHover={{ scale: 1.05 }}>
              <div className="icon-wrapper">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
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
            <p>Email: <a href="mailto:support@prasoclothing.com">support@prasoclothing.com</a></p>
            <p>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
          </div>
          <div className="footer-section">
            <h3>Stay Updated</h3>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Your Email" required />
              <button type="submit" aria-label="Subscribe"><FiMail /></button>
            </form>
            <h3>Follow Us</h3>
            <div className="social-links">
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, idx) => (
                <motion.a key={idx} href="#" aria-label={`Follow on ${Icon.name}`} whileHover={{ scale: 1.2 }}>
                  <Icon />
                </motion.a>
              ))}
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
