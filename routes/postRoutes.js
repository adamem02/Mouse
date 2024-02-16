const express = require('express');
const router = express.Router();
const { getAllPosts, createPost, updatePost, deletePost } = require('../controllers/postController');


router.get('/posts', getAllPosts);
router.post('/posts', createPost);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);


module.exports = router;
