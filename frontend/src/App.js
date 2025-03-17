import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import VerificationPage from './pages/VerificationPage';
import VerificationPendingPage from './pages/VerificationPendingPage';
import WelcomePage from './pages/WelcomePage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify" element={<VerificationPage />} />
            <Route path="/verification-pending" element={<VerificationPendingPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
