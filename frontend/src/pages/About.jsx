import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <section className="about-section">
        <h1>About Praso</h1>
        <p>
          Praso Clothing is dedicated to bringing you the best in fashion. Our mission is to provide high-quality, stylish clothing that makes you feel confident and comfortable. With a focus on innovation, we offer custom designs, a virtual fitting room, and a rewarding shopping experience.
        </p>
        <p>
          Founded in 2025, Praso has quickly become a go-to destination for fashion enthusiasts worldwide. Join us on our journey to redefine style.
        </p>
      </section>
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
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Praso Clothing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default About;