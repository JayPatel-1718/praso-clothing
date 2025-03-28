import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Fetch user data from Firestore (handled by AuthContext)
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Use Google profile data
      const userData = {
        uid: firebaseUser.uid,
        username: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        email: firebaseUser.email,
        pfp: firebaseUser.photoURL || 'https://via.placeholder.com/30?text=' + firebaseUser.displayName.charAt(0).toUpperCase(),
      };
      await login(userData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signin-page">
      <Navbar />
      <section className="signin-section">
        <h1>Sign In</h1>
        {error && <p className="error">{error}</p>}
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <button className="google-signin" onClick={handleGoogleSignIn}>
          Sign In with Google
        </button>
        <p>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </section>
    </div>
  );
}

export default SignIn;