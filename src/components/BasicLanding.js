import React from 'react';
import './BasicLanding.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShippingFast, faHeadset, faSyncAlt, faCertificate, faTshirt, faGift, faPalette, faTags } from '@fortawesome/free-solid-svg-icons';

function BasicLanding({ heroImage }) {
  return (
    <div className="basic-landing fade-in">
      {/* Hero Section */}
      <section className="hero fade-in">
        <img src="/images/hero.jpg" alt="Hero" className="hero-img" />
        <div className="hero-content">
          <h1>Welcome to Praso Clothing</h1>
          <p>Your one-stop shop for personalized fashion.</p>
          <a href="/quiz" className="cta-btn">Take the Style Quiz</a>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="product-section fade-in-delayed">
        <h2>Featured Products</h2>
        <div className="products-grid">
          <div className="product-card">
            <img src="/images/back_1.png" alt="Stylish Jacket" />
            <h3>Stylish Jacket</h3>
            <p>₹2,499</p>
            <div className="color-options">
              <span className="color-circle" style={{ backgroundColor: '#000' }}></span>
              <span className="color-circle" style={{ backgroundColor: '#555' }}></span>
              <span className="color-circle" style={{ backgroundColor: '#f00' }}></span>
            </div>
          </div>
          <div className="product-card">
            <img src="/images/back_2.png" alt="Pastel Hoodie" />
            <h3>Pastel Hoodie</h3>
            <p>₹1,999</p>
            <div className="color-options">
              <span className="color-circle" style={{ backgroundColor: '#ff6b6b' }}></span>
              <span className="color-circle" style={{ backgroundColor: '#ffd93b' }}></span>
              <span className="color-circle" style={{ backgroundColor: '#56ccf2' }}></span>
            </div>
          </div>
          <div className="product-card">
            <img src="/images/back_3.png" alt="Monochrome Tee" />
            <h3>Monochrome Tee</h3>
            <p>₹999</p>
            <div className="color-options">
              <span className="color-circle" style={{ backgroundColor: '#333' }}></span>
              <span className="color-circle" style={{ backgroundColor: '#888' }}></span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us fade-in-delayed">
        <h2>Why Choose Us?</h2>
        <div className="choose-us-grid">
          <div className="choose-us-card">
            <FontAwesomeIcon icon={faShippingFast} className="icon" />
            <h3>Free Shipping</h3>
            <p>We offer fast and free shipping on all orders over ₹1,000.</p>
          </div>
          <div className="choose-us-card">
            <FontAwesomeIcon icon={faHeadset} className="icon" />
            <h3>24/7 Support</h3>
            <p>Our support team is here to help you 24/7 with your needs.</p>
          </div>
          <div className="choose-us-card">
            <FontAwesomeIcon icon={faSyncAlt} className="icon" />
            <h3>Easy Returns</h3>
            <p>Not satisfied? Enjoy hassle-free returns within 30 days.</p>
          </div>
          <div className="choose-us-card">
            <FontAwesomeIcon icon={faCertificate} className="icon" />
            <h3>Quality Guarantee</h3>
            <p>All of our products are guaranteed to be of the highest quality.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section fade-in-delayed">
        <h2>Our Exclusive Features</h2>
        <div className="features-grid">
          <div className="feature-card feature-card-crazy">
            <FontAwesomeIcon icon={faTshirt} className="feature-icon" />
            <h3>Virtual Fitting Room</h3>
            <p>Try on clothes virtually to find your perfect fit from the comfort of your home!</p>
          </div>
          <div className="feature-card feature-card-crazy">
            <FontAwesomeIcon icon={faGift} className="feature-icon" />
            <h3>Exclusive Rewards</h3>
            <p>Earn points with every purchase and unlock amazing rewards only for our loyal customers.</p>
          </div>
          <div className="feature-card feature-card-crazy">
            <FontAwesomeIcon icon={faPalette} className="feature-icon" />
            <h3>Custom Designs</h3>
            <p>Create your own unique design and have it printed on our products.</p>
          </div>
          <div className="feature-card feature-card-crazy">
            <FontAwesomeIcon icon={faTags} className="feature-icon" />
            <h3>Seasonal Sales</h3>
            <p>Enjoy discounts and sales on our products every season. Stay stylish while saving!</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer fade-in-delayed">
        <div className="footer-links">
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
          <ul>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
          <ul>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Sustainability</a></li>
          </ul>
        </div>

        <div className="footer-content">
          <p>© 2025 Praso Clothing. All rights reserved.</p>
          <ul className="social-icons">
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default BasicLanding;
