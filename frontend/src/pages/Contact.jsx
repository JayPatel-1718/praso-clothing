import React from 'react';
import Navbar from '../components/Navbar';
import '../App.css';

function Contact() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrapper">
        <h1>Contact Us</h1>
        <p>Have any questions? Reach out to us!</p>
        <p>Email: support@prasoclothing.com</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );
}

export default Contact;