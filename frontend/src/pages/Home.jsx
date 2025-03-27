import React from 'react';
import Navbar from '../components/Navbar';
import '../App.css';

function Home() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrapper">
        <h1>Welcome to Praso Clothing</h1>
        <p>Discover the latest trends in fashion. Shop now and find your perfect style!</p>
        <a href="/shop" className="shop-now-button">Shop Now</a>
      </div>
    </div>
  );
}

export default Home;