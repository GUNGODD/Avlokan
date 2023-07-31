// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the username or email is already registered
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already registered' });
    }

    // Create a new user account
    await User.create(username, email, password, role);

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Set session data or JWT token for session management

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
