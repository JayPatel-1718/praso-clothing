import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage, googleProvider, signInWithPopup } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      let pfpUrl = 'https://via.placeholder.com/30?text=' + username.charAt(0).toUpperCase();
      if (profilePic) {
        const storageRef = ref(storage, `profile-pics/${firebaseUser.uid}`);
        await uploadBytes(storageRef, profilePic);
        pfpUrl = await getDownloadURL(storageRef);
      }

      // Update Firebase Authentication user profile with username and pfp
      await updateProfile(firebaseUser, {
        displayName: username,
        photoURL: pfpUrl,
      });

      navigate('/'); // onAuthStateChanged in AuthContext will handle user state
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // onAuthStateChanged in AuthContext will handle user state
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