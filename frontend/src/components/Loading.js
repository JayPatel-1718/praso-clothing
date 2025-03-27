import React from 'react';
import './Loading.css'; // Make sure to create this CSS

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
