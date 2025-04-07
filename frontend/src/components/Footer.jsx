import React from 'react';
import { motion } from 'framer-motion'; // For animations
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from 'react-icons/fi'; // Social media and email icons
import './Footer.css';

function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* PRASO Section */}
        <div className="footer-section">
          <h3>PRASO</h3>
          <p>Elevate your style with Praso Clothing.</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@prasoclothing.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>

        {/* Stay Updated & Follow Us Section */}
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
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <FiFacebook />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <FiInstagram />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <FiTwitter />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Praso Clothing. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;