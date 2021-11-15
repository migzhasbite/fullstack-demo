const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * POST /api/auth/signup
 */
router.post('/signup', (req, res) => {
  bcrypt
    .hash(req.body.password, 8)
    .then((password) => {
      // create a row to the DB user table
      const userObj = { ...req.body, password: password };
      User.create(userObj).then((user) => {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: '24h',
        });
        res.status(201).json({ user, token });
      });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Please enter required information' });
    });
});

/**
 * POST /api/auth/login
 */
router.post('/login', (req, res) => {
  // I need this for line 41 to "see" the user
  let confirmedUser;

  User.findOne({ email: req.body.email })
    .then((user) => {
      confirmedUser = { ...user };
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(() => {
      const token = jwt.sign(
        { email: confirmedUser.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        }
      );
      res.status(200).json({ user: confirmedUser, token });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Invalid credentials.' });
    });
});

module.exports = router;
