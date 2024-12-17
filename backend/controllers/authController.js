const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const EmailService = require('../services/emailService');


// JWT secret
const jwtSecret = process.env.JWTSecret;

// Register a new user
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ firstName, lastName, email, password });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login a user and return a token
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });    
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    //const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.LoginTokenExpireTime });

    res.json({ user: {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email}, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    user.resetCode = verificationCode;
    user.resetCodeExpires = Date.now() + 15 * 60 * 1000; // Valid for 15 minutes
    await user.save();

    const emailData = {
      from: process.env.EMAIL_USER,
      fromName: process.env.EMAIL_FromName,
      to: email,
      subject: 'Password Reset Verification Code',
      html: `<p>Your verification code is: ${verificationCode}</p>`
    };

    await EmailService.sendEmail(emailData);
    res.status(200).json({ msg: `Verification code sent to email` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Verify the reset code
exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.resetCode !== code || user.resetCodeExpires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired verification code' });
    }

    user.resetCode = null;
    user.resetCodeExpires = null;
    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: 'Verification successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Reset the password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(400).json({ msg: 'User not verified' });
    }

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(newPassword, salt);
    user.password = newPassword;

    user.isVerified = false;
    await user.save();

    res.status(200).json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Change password using token
exports.changePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // // Verify old password
    // const isMatch = await user.matchPassword(oldPassword);
    // if (!isMatch) {
    //   return res.status(400).json({ msg: 'Invalid old password' });
    // }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ msg: 'Password changed successfully' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Invalid or expired token' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Check user role by using token
exports.checkUser = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ isUser: false, isAdmin: false , msg: 'User not found' });
    }

    res.status(200).json({ isUser: true, isAdmin: user.role == 'admin' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ isUser: false, isAdmin: false, msg: 'Invalid or expired token' });
    }
    console.error(err.message);
    res.status(500).send('Server error');
  }
};