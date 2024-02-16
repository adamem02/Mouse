const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');


const userController = {
  
  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);

     
      const newUser = await User.create({ username, password: hashedPassword });

     
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


  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

   
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

   
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

     
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

 
  logoutUser: (req, res) => {
    try {
      req.session.destroy();
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

 
  getUserInfo: (req, res) => {
    try {
      const user = req.session.user;

      if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = router;

