const express = require('express');
const router = express.Router();
const { getAllPosts, getOnePost } = require('../controllers/homeController');

// Home page routes
router.get('/', getAllPosts);
router.get('/post/:postId', getOnePost);

module.exports = router;


