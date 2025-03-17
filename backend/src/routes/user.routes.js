const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protected route - Get current user profile
router.get('/profile', authMiddleware, (req, res) => {
  try {
    // The user data is available in req.user after the auth middleware
    res.status(200).json({
      message: 'User profile retrieved successfully',
      user: {
        id: req.user.id,
        email: req.user.email
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;