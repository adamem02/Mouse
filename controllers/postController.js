const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

const postController = {
 
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }, { model: Comment, attributes: ['content'], include: { model: User, attributes: ['username'] } }],
      });

      res.render('posts', { posts }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  getPostById: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId, {
        include: [{ model: User, attributes: ['username'] }, { model: Comment, attributes: ['content'], include: { model: User, attributes: ['username'] } }],
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.render('post', { post }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new post
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.session.user.id; 

      const newPost = await Post.create({ title, content, user_id: userId });

      res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  updatePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;

      const updatedPost = await Post.update({ title, content }, { where: { id: postId } });

      if (!updatedPost[0]) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;

      const deletedPost = await Post.destroy({ where: { id: postId } });

      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = router;
