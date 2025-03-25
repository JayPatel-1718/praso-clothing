import React from 'react';
import './BasicLanding.css';

function BasicLanding({ heroImage }) {
  return (
    <div className="basic-landing">
    {/* Hero Section */}
    <section className="hero">
      <img src="/images/hero.jpg" alt="Hero" className="hero-img" />
      <div className="hero-content">
        <h1>Welcome to Praso Clothing</h1>
        <p>Your one-stop shop for personalized fashion.</p>
        <a href="/quiz" className="cta-btn">Take the Style Quiz</a>
      </div>
    </section>

      {/* Featured Products Section */}
      <section className="product-section">
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
     <section className="why-choose-us">
     <h2>Why Choose Us?</h2>
     <div className="choose-us-grid">
       <div className="choose-us-card">
         <i className="fas fa-shipping-fast"></i>
         <h3>Free Shipping</h3>
         <p>We offer fast and free shipping on all orders over ₹1,000.</p>
       </div>
       <div className="choose-us-card">
         <i className="fas fa-headset"></i>
         <h3>24/7 Support</h3>
         <p>Our support team is here to help you 24/7 with your needs.</p>
       </div>
       <div className="choose-us-card">
         <i className="fas fa-sync-alt"></i>
         <h3>Easy Returns</h3>
         <p>Not satisfied? Enjoy hassle-free returns within 30 days.</p>
       </div>
     </div>
   </section>

   {/* Newsletter Subscription Section */}
   <section className="newsletter">
     <h2>Subscribe to Our Newsletter</h2>
     <p>Stay updated with our latest offers and products!</p>
     <form className="newsletter-form">
       <input type="email" placeholder="Enter your email" required />
       <button type="submit">Subscribe</button>
     </form>
   </section>

   {/* Footer Section */}
   <footer className="footer">
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
