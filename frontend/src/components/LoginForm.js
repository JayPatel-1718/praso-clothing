import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../App.css';

function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        toast.success('Logged in successfully!');
        navigate('/', { replace: true });
      } else {
        toast.error(response.data.message || 'Invalid email or password');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container fade-in">
      <h1>Welcome Back</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            })}
            disabled={isSubmitting}
            aria-label="Email"
          />
          {errors.email && <p className="error" role="alert">{errors.email.message}</p>}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            disabled={isSubmitting}
            aria-label="Password"
          />
          {errors.password && <p className="error" role="alert">{errors.password.message}</p>}
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          aria-label="Login"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="footer-links">
        <p className="toggle-link" onClick={() => navigate('/register')}>
          Need an account? <span>Sign up</span>
        </p>
        <p className="forgot-password" onClick={() => navigate('/forgot-password')}>
          Forget password?
        </p>
      </div>
    </div>
  );
}

export default LoginForm;