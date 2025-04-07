import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';

function About() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="about-page">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Praso</h1>
          <p>
            Praso Clothing is dedicated to bringing you the best in fashion. Our mission is to provide high-quality, stylish clothing that makes you feel confident and comfortable. With a focus on innovation, we offer custom designs, a virtual fitting room, and a rewarding shopping experience.
          </p>
          <button className="cta-button" onClick={() => navigate('/shop')}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>To empower individuals to express themselves through fashion while ensuring sustainability and quality.</p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>To redefine global fashion by blending innovation with timeless style.</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <h3>Arya Suke</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <h3>OM Sheta</h3>
            <p>Founder</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Praso Clothing has transformed my wardrobe. The quality is unmatched!"</p>
            <h4>- Jay P.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Best fashion brand out there. Their designs are unique and stylish."</p>
            <h4>- Raj P.</h4>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;