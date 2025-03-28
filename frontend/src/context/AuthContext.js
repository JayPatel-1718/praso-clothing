import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [quizPreferences, setQuizPreferences] = useState(null);

  useEffect(() => {
    // Load user and preferences from local storage on mount
    const storedUser = localStorage.getItem('user');
    const storedPreferences = localStorage.getItem('quizPreferences');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedPreferences) {
      setQuizPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setQuizPreferences(null);
    localStorage.removeItem('user');
    localStorage.removeItem('quizPreferences');
  };

  const saveQuizPreferences = (preferences) => {
    setQuizPreferences(preferences);
    localStorage.setItem('quizPreferences', JSON.stringify(preferences));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, quizPreferences, saveQuizPreferences }}>
      {children}
    </AuthContext.Provider>
  );
};