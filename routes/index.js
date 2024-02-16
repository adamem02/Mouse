const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const commentRoutes = require('./commentRoutes');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');


router.use('/auth', authRoutes);
router.use('/comments', commentRoutes);
router.use('/home', homeRoutes);
router.use('/posts', postRoutes);

router.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});

module.exports = router;
