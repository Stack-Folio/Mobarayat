const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  forgotPassword, 
  verifyCode, 
  resetPassword,
  changePassword,
  checkUser
} = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Verify Code
router.post('/verify-code', verifyCode);

// Reset Password
router.post('/reset-password', resetPassword);

// Update password by Token
router.post('/update-password', changePassword);

// Check user role by using token
router.post('/check-user', checkUser);

module.exports = router;
