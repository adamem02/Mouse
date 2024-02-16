const express = require('express');
const router = express.Router();
const { getAllPosts, getOnePost } = require('../controllers/homeController');


router.get('/', getAllPosts);
router.get('/post/:postId', getOnePost);

module.exports = router;


