import React, { useState } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.password) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Validate password strength
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      const response = await authService.signup(formData);
      setSuccess(response.message);
      setFormData({ name: '', email: '', password: '' });
      
      // Redirect to verification pending page
      setTimeout(() => {
        navigate('/verification-pending', { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Create an Account</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>
        
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="login-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignupForm;