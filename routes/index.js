// index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const commentRoutes = require('./commentRoutes');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');

// Use the routes
router.use('/auth', authRoutes);
router.use('/comments', commentRoutes);
router.use('/home', homeRoutes);
router.use('/posts', postRoutes);

// Handle requests to the root path
router.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});

module.exports = router;
