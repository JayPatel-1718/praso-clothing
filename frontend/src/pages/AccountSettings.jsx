import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth, storage } from '../firebase';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FiUpload, FiEye, FiEyeOff } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import './AccountSettings.css';

function AccountSettings() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Update profile picture if provided
      let pfpUrl = user.pfp;
      if (profilePic) {
        const storageRef = ref(storage, `profile-pics/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        pfpUrl = await getDownloadURL(storageRef);
      }

      // Update Firebase Authentication user profile
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: pfpUrl,
      });

      // Update email in Firebase Authentication if changed
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      // Update password in Firebase Authentication if provided
      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      // Update AuthContext with new user data
      const updatedUser = {
        ...user,
        username,
        email,
        pfp: pfpUrl,
      };
      updateUser(updatedUser);

      setSuccess('Account updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    navigate('/signin');
    return null;
  }

  return (
    <div className="account-settings-page">
      <Navbar />
      <section className="account-settings-section">
        <h1>Account Settings</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form className="account-settings-form" onSubmit={handleSubmit}>
          <div className="profile-pic-upload">
            <label htmlFor="profile-pic">
              <FiUpload /> Update Profile Picture
            </label>
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
            {profilePic && <p>Selected: {profilePic.name}</p>}
            {user.pfp && (
              <img src={user.pfp} alt="Profile" className="current-pfp" />
            )}
          </div>
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
              placeholder="New Password (leave blank to keep current)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </section>
    </div>
  );
}

export default AccountSettings;
