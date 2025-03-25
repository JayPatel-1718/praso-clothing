import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BasicLanding from './components/BasicLanding';
import Quiz from './components/Quiz';
import PersonalizedLanding from './components/PersonalizedLanding';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  // Check if user is already logged in (saved in localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<BasicLanding />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/personalized-landing" element={<PersonalizedLanding />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
