import React, { createContext, useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizPreferences, setQuizPreferences] = useState(null); // ✅ NEW STATE

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setQuizPreferences(null); // ✅ Clear preferences on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmail,
        loginWithGoogle,
        logout,
        loading,
        quizPreferences,          // ✅ Exported to use in Home & Quiz
        setQuizPreferences        // ✅ Setter function for quiz
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
