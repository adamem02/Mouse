const express = require('express');
const router = express.Router();

const authController = require('./authController');
const commentController = require('./commentController');
const homeController = require('./homeController');
const postController = require('./postController');
const userController = require('./userController');

router.use('/auth', authController);
router.use('/comment', commentController);
router.use('/home', homeController);
router.use('/post', postController);
router.use('/user', userController);

module.exports = router;
