import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FiPenTool, FiCamera, FiGift, FiShield, FiTruck, FiHeadphones, FiMail, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import './Home.css';

function Home() {
  const { addToCart } = useContext(CartContext);
  const { user, quizPreferences, saveQuizPreferences } = useContext(AuthContext);
  const navigate = useNavigate();

  // State for quiz modal and steps
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizStep, setQuizStep] = useState('intro'); // intro, quiz, results
  const [quizAnswers, setQuizAnswers] = useState({
    style: '',
    color: '',
    occasion: '',
  });

  const allProducts = [
    { id: 1, name: 'Classic T-Shirt', price: 19.99, image: 'https://via.placeholder.com/300x400?text=Classic+T-Shirt', style: 'casual', color: 'white', occasion: 'everyday' },
    { id: 2, name: 'Denim Jeans', price: 49.99, image: 'https://via.placeholder.com/300x400?text=Denim+Jeans', style: 'casual', color: 'blue', occasion: 'everyday' },
    { id: 3, name: 'Hooded Sweatshirt', price: 39.99, image: 'https://via.placeholder.com/300x400?text=Hooded+Sweatshirt', style: 'casual', color: 'gray', occasion: 'everyday' },
    { id: 4, name: 'Leather Jacket', price: 89.99, image: 'https://via.placeholder.com/300x400?text=Leather+Jacket', style: 'edgy', color: 'black', occasion: 'party' },
    { id: 5, name: 'Summer Dress', price: 29.99, image: 'https://via.placeholder.com/300x400?text=Summer+Dress', style: 'bohemian', color: 'red', occasion: 'party' },
    { id: 6, name: 'Formal Shirt', price: 34.99, image: 'https://via.placeholder.com/300x400?text=Formal+Shirt', style: 'formal', color: 'white', occasion: 'work' },
  ];

  // Filter products based on quiz preferences
  const featuredProducts = quizPreferences
    ? allProducts.filter(product =>
        (quizPreferences.style === '' || product.style === quizPreferences.style) &&
        (quizPreferences.color === '' || product.color === quizPreferences.color) &&
        (quizPreferences.occasion === '' || product.occasion === quizPreferences.occasion)
      )
    : allProducts.slice(0, 3); // Default to first 3 products if no preferences

  const handleStyleQuiz = () => {
    setIsQuizModalOpen(true);
    setQuizStep('intro');
  };

  const handleQuizAnswer = (question, answer) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const handleQuizSubmit = () => {
    saveQuizPreferences(quizAnswers);
    setQuizStep('results');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

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
        <motion.button
          className="style-quiz-cta"
          onClick={handleStyleQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Take the Quiz
        </motion.button>

        {/* Quiz Modal */}
        {isQuizModalOpen && (
          <motion.div
            className="quiz-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="quiz-modal-content">
              <button className="quiz-modal-close" onClick={() => setIsQuizModalOpen(false)}>
                ×
              </button>

              {quizStep === 'intro' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>How the Style Quiz Works</h3>
                  <p>
                    Our style quiz helps you find the perfect clothing by asking a few simple questions about your preferences. Answer the questions, and we’ll curate a personalized selection just for you!
                  </p>
                  <div className="quiz-auth">
                    {user ? (
                      <div className="quiz-auth-logged">
                        <div className="user-box">
                          <p>Logged in as: <strong>{user.username}</strong></p>
                        </div>
                        <button onClick={() => setQuizStep('quiz')}>
                          Continue
                        </button>
                      </div>
                    ) : (
                      <div className="quiz-auth-not-logged">
                        <p>You need to sign up to take the quiz.</p>
                        <button onClick={() => navigate('/signup')}>
                          Sign Up Now
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {quizStep === 'quiz' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>Style Quiz</h3>
                  <div className="quiz-question">
                    <p>1. What’s your preferred style?</p>
                    <div className="quiz-options">
                      <button onClick={() => handleQuizAnswer('style', 'casual')}>Casual</button>
                      <button onClick={() => handleQuizAnswer('style', 'formal')}>Formal</button>
                      <button onClick={() => handleQuizAnswer('style', 'bohemian')}>Bohemian</button>
                      <button onClick={() => handleQuizAnswer('style', 'edgy')}>Edgy</button>
                    </div>
                  </div>
                  <div className="quiz-question">
                    <p>2. What’s your favorite color?</p>
                    <div className="quiz-options">
                      <button onClick={() => handleQuizAnswer('color', 'white')}>White</button>
                      <button onClick={() => handleQuizAnswer('color', 'blue')}>Blue</button>
                      <button onClick={() => handleQuizAnswer('color', 'red')}>Red</button>
                      <button onClick={() => handleQuizAnswer('color', 'black')}>Black</button>
                    </div>
                  </div>
                  <div className="quiz-question">
                    <p>3. What occasion do you shop for most?</p>
                    <div className="quiz-options">
                      <button onClick={() => handleQuizAnswer('occasion', 'everyday')}>Everyday</button>
                      <button onClick={() => handleQuizAnswer('occasion', 'work')}>Work</button>
                      <button onClick={() => handleQuizAnswer('occasion', 'party')}>Party</button>
                    </div>
                  </div>
                  <button className="quiz-submit" onClick={handleQuizSubmit}>
                    Submit
                  </button>
                </motion.div>
              )}

              {quizStep === 'results' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>Your Style Profile</h3>
                  <p>Based on your answers, we’ve curated a personalized selection for you!</p>
                  <ul>
                    <li>Style: {quizAnswers.style || 'Not specified'}</li>
                    <li>Color: {quizAnswers.color || 'Not specified'}</li>
                    <li>Occasion: {quizAnswers.occasion || 'Not specified'}</li>
                  </ul>
                  <button onClick={() => setIsQuizModalOpen(false)}>
                    See Your Recommendations
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <h2>{quizPreferences ? 'Your Personalized Recommendations' : 'Featured Products'}</h2>
        <div className="product-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products match your preferences. Try adjusting your quiz answers!</p>
          )}
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