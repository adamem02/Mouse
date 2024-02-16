const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

// Render the home page
router.get('/', async (req, res) => {
  try {
    // Fetch all posts along with associated user and comment data
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['content'], include: { model: User, attributes: ['username'] } },
      ],
    });

    // Render the 'home' view with the fetched data
    res.render('home', { posts });
  } catch (err) {
    console.error(err);
    // Handle errors appropriately, such as rendering an error page or sending a JSON response
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
