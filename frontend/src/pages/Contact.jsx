import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Import the shared Footer component
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:support@prasoclothing.com?subject=${subject}&body=${body}`;
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <Navbar />
      <section className="contact-section">
        <h1>Contact Us</h1>
        <p>Have any questions? We’re here to help!</p>
        <div className="contact-info">
          <p>Email: support@prasoclothing.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Fashion Street, Style City, USA</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;