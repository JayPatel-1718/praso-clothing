// src/pages/StyleQuiz.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './StyleQuiz.css';

const StyleQuiz = () => {
  const { setQuizPreferences } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    style: '',
    color: '',
    occasion: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuizPreferences(formData);
    navigate('/');
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-heading">Discover Your Style</h1>
      <form onSubmit={handleSubmit} className="quiz-form">
        <label>
          Choose your style:
          <select name="style" value={formData.style} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="bohemian">Bohemian</option>
            <option value="edgy">Edgy</option>
          </select>
        </label>

        <label>
          Favorite color:
          <select name="color" value={formData.color} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="beige">Beige</option>
            <option value="gray">Gray</option>
          </select>
        </label>

        <label>
          Occasion:
          <select name="occasion" value={formData.occasion} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="everyday">Everyday</option>
            <option value="work">Work</option>
            <option value="party">Party</option>
          </select>
        </label>

        <button type="submit" className="submit-quiz-btn">Show My Vibe</button>
      </form>
    </div>
  );
};

export default StyleQuiz;
