const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    console.log("Register Request Body:", req.body);
  
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ msg: 'User already exists' });
  
      const user = await User.create({ name, email, password });
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error("Register Error:", err);  // 👈 This will show the actual issue
      res.status(500).json({ msg: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
