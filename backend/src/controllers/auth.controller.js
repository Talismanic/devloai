const User = require('../models/user.model');
const emailService = require('../services/email.service');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      
      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Create user
      const user = await User.createUser(name, email, password);
      
      // Send verification email
      await emailService.sendVerificationEmail(email, user.verificationToken);
      
      res.status(201).json({
        message: 'User registered successfully. Please check your email for verification.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.is_verified
        }
      });
    } catch (error) {
      if (error.message === 'User with this email already exists') {
        return res.status(409).json({ message: error.message });
      }
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async verify(req, res) {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({ message: 'Verification token is required' });
      }
      
      const user = await User.verifyUser(token);
      
      res.status(200).json({
        message: 'Email verified successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.is_verified
        }
      });
    } catch (error) {
      console.error('Verification error:', error);
      if (error.message === 'Invalid verification token') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      
      // Find user by email
      const user = await User.findByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // Check if user is verified
      if (!user.is_verified) {
        return res.status(401).json({ message: 'Please verify your email before logging in' });
      }
      
      // Validate password
      const isPasswordValid = await User.validatePassword(user, password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.is_verified
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new AuthController();