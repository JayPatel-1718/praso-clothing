import React from 'react';
import Navbar from '../components/Navbar';
import '../App.css';

function About() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrapper">
        <h1>About Us</h1>
        <p>We are Praso Clothing, a brand dedicated to bringing you the best in fashion. Our mission is to provide high-quality, stylish clothing that makes you feel confident and comfortable.</p>
      </div>
    </div>
  );
}

export default About;