import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth, storage, googleProvider, signInWithPopup } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Upload profile picture to Firebase Storage if provided
      let pfpUrl = 'https://via.placeholder.com/30?text=' + username.charAt(0).toUpperCase();
      if (profilePic) {
        const storageRef = ref(storage, `profile-pics/${firebaseUser.uid}`);
        await uploadBytes(storageRef, profilePic);
        pfpUrl = await getDownloadURL(storageRef);
      }

      // Save user data to AuthContext and Firestore (via login)
      const userData = {
        uid: firebaseUser.uid,
        username,
        email,
        pfp: pfpUrl,
      };
      await login(userData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
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
    <div className="signup-page">
      <Navbar />
      <section className="signup-section">
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <div className="profile-pic-upload">
            <label htmlFor="profile-pic">
              <FiUpload /> Upload Profile Picture
            </label>
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
            {profilePic && <p>Selected: {profilePic.name}</p>}
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <button className="google-signup" onClick={handleGoogleSignUp}>
          Sign Up with Google
        </button>
        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </section>
    </div>
  );
}

export default SignUp;