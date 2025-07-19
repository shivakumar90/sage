const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already exists.' });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.json({ success: true, message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login endpoint (no authentication yet)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    res.json({ success: true, message: 'Login successful.', user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router; 