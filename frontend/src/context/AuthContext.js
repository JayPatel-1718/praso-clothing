import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [quizPreferences, setQuizPreferences] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            username: userData.username,
            email: userData.email,
            pfp: userData.pfp || 'https://via.placeholder.com/30?text=' + userData.username.charAt(0).toUpperCase(),
          });
          setQuizPreferences(userData.quizPreferences || null);
        }
      } else {
        setUser(null);
        setQuizPreferences(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    // Save user data to Firestore
    await setDoc(doc(db, 'users', userData.uid), {
      username: userData.username,
      email: userData.email,
      pfp: userData.pfp,
      quizPreferences: null,
    });
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    setQuizPreferences(null);
  };

  const saveQuizPreferences = async (preferences) => {
    setQuizPreferences(preferences);
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { quizPreferences: preferences }, { merge: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, quizPreferences, saveQuizPreferences }}>
      {children}
    </AuthContext.Provider>
  );
};