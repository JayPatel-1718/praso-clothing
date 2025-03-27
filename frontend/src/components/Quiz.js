import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Quiz.css';

function Quiz() {
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  const handleSelect = (question, option) => {
    setSelected({ ...selected, [question]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the personalized landing page with user preferences
    navigate('/personalized-landing', { state: selected });
  };

  return (
    <div className="quiz-container">
      <h1>Discover Your Style</h1>
      <p>Answer a few questions to get personalized recommendations.</p>
      <form onSubmit={handleSubmit}>
        {/* Question 1 */}
        <div className="question">
          <h2>1. What's your favorite color palette?</h2>
          <div className={`option ${selected.q1 === 'Bold & Vibrant' ? 'selected' : ''}`} onClick={() => handleSelect('q1', 'Bold & Vibrant')}>
            Bold & Vibrant
          </div>
          <div className={`option ${selected.q1 === 'Pastel & Soft' ? 'selected' : ''}`} onClick={() => handleSelect('q1', 'Pastel & Soft')}>
            Pastel & Soft
          </div>
          <div className={`option ${selected.q1 === 'Earthy & Natural' ? 'selected' : ''}`} onClick={() => handleSelect('q1', 'Earthy & Natural')}>
            Earthy & Natural
          </div>
          <div className={`option ${selected.q1 === 'Monochrome' ? 'selected' : ''}`} onClick={() => handleSelect('q1', 'Monochrome')}>
            Monochrome
          </div>
        </div>
        
        {/* Question 2 */}
        <div className="question">
          <h2>2. What's your go-to style?</h2>
          <div className={`option ${selected.q2 === 'Streetwear' ? 'selected' : ''}`} onClick={() => handleSelect('q2', 'Streetwear')}>
            Streetwear
          </div>
          <div className={`option ${selected.q2 === 'Casual' ? 'selected' : ''}`} onClick={() => handleSelect('q2', 'Casual')}>
            Casual
          </div>
          <div className={`option ${selected.q2 === 'Formal' ? 'selected' : ''}`} onClick={() => handleSelect('q2', 'Formal')}>
            Formal
          </div>
          <div className={`option ${selected.q2 === 'Athleisure' ? 'selected' : ''}`} onClick={() => handleSelect('q2', 'Athleisure')}>
            Athleisure
          </div>
        </div>

        {/* Submit */}
        <button className="cta-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Quiz;
