const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

const authController = {
  // Registration
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the username is already taken
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ username, password: hashedPassword });

      // Set user session
      req.session.user = {
        id: newUser.id,
        username: newUser.username,
      };

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Set user session
      req.session.user = {
        id: user.id,
        username: user.username,
      };

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Logout
  logout: (req, res) => {
    try {
      req.session.destroy();
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = router;
