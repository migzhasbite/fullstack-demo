const router = require('express').Router();
const bcrypt = require('bcryptjs');
const queries = require('../db/queries');
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
      queries.create(userObj).then((user) => {
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
  queries
    .getUserByEmail(req.body.email)
    .then((user) => bcrypt.compare(req.body.password, user.password))
    .then(() => {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      res.status(200).json({ user, token });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Invalid credentials.' });
    });
});

module.exports = router;
