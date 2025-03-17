import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const EmailVerification = () => {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your email...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get token from URL query params
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (!token) {
          setStatus('error');
          setMessage('Verification token is missing');
          return;
        }

        // Call API to verify email
        const response = await authService.verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Email verified successfully!');

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Email verification failed');
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div className="verification-container">
      <h2>Email Verification</h2>
      <div className={`verification-message ${status}`}>
        {message}
      </div>
      {status === 'success' && (
        <p>You will be redirected to the login page shortly...</p>
      )}
      {status === 'error' && (
        <div>
          <p>Please try again or contact support if the problem persists.</p>
          <button onClick={() => navigate('/signup')}>Back to Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;