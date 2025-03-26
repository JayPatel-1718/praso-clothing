import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BasicLanding from './components/BasicLanding';
import Quiz from './components/Quiz';
import PersonalizedLanding from './components/PersonalizedLanding';
import Login from './components/Login';
import Loading from './components/Loading'; // Import the loading component

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    // Simulate loading time (e.g., fetching user data)
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false); // Set loading to false after fetching data
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; // Display loading animation while loading
  }

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
