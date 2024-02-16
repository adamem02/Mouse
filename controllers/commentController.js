const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');


const commentController = {
  // Get all comments for a post
  getCommentsByPostId: async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await Comment.findAll({
        where: { post_id: postId },
        include: { model: User, attributes: ['username'] },
      });
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new comment for a post
  createComment: async (req, res) => {
    try {
      const { postId, content } = req.body;
      const userId = req.session.user.id;

      const newComment = await Comment.create({ post_id: postId, user_id: userId, content });

      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update a comment by ID
  updateCommentById: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const updatedComment = await Comment.update({ content }, { where: { id } });

      if (updatedComment[0] === 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a comment by ID
  deleteCommentById: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedComment = await Comment.destroy({ where: { id } });

      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = router;
