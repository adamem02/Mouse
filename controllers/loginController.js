const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();


router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
   
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    req.session.user = user;

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
