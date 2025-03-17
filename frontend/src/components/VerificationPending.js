import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerificationPending = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email';

  return (
    <div className="verification-pending-container">
      <h2>Verification Email Sent</h2>
      <div className="verification-message">
        <p>
          We've sent a verification link to <strong>{email}</strong>. Please check your
          inbox and click the link to verify your email address.
        </p>
        <p>
          If you don't see the email, please check your spam folder or request a
          new verification email.
        </p>
      </div>
      <div className="verification-actions">
        <button onClick={() => navigate('/login')}>Go to Login</button>
        <button onClick={() => navigate('/signup')}>Back to Sign Up</button>
      </div>
    </div>
  );
};

export default VerificationPending;