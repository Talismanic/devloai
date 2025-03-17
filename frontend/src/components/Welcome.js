import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Welcome = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is logged in
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        
        // Set initial user data from localStorage
        setUser(currentUser);
        
        // Fetch the latest user profile from the API
        try {
          const profileData = await authService.getUserProfile();
          if (profileData.user) {
            // Update with the latest data from the server
            setUser(prev => ({ ...prev, ...profileData.user }));
          }
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
          // Continue with the data from localStorage
        }
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!user) {
    return <div className="error-container">User data not available</div>;
  }

  return (
    <div className="welcome-container">
      <h1>Welcome, {user.name}!</h1>
      <p>You have successfully logged in to your account.</p>
      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Welcome;
