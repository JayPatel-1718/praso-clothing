import React from 'react';
import './Hero.css';

function Hero({ heroImage, heading, subText }) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <h1>{heading}</h1>
        <p>{subText}</p>
        <a href="#shop" className="cta-btn">Shop Now</a>
      </div>
    </section>
  );
}

export default Hero;
