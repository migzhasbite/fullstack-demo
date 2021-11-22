const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signUpUser = (req, res) => {
  // 1. Hash the password so we're not saving as plaintext
  bcrypt
    .hash(req.body.password, 8)
    .then((password) => {
      // create a row to the DB user table
      const userObj = { ...req.body, password: password };
      User.create(userObj).then((user) => {
        // In MySQL, inserting a row gives something like [id]
        // where "id" is the id of the new row
        console.log(user);
        console.log(user[0]);
        const token = jwt.sign(
          { email: userObj.email },
          process.env.JWT_SECRET,
          {
            expiresIn: '24h',
          }
        );
        userObj.id = user[0];
        delete userObj.password;
        res.status(201).json({ user: userObj, token });
      });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Please enter required information' });
    });
};

exports.signInUser = (req, res) => {
  // I need this for line 37 to "see" confirmedUser
  let confirmedUser;

  User.findOneWithPW({ email: req.body.email })
    .then((user) => {
      confirmedUser = { ...user };
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
      const token = jwt.sign(
        { email: confirmedUser.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        }
      );
      // Don't give the password, even if it's hashed!
      delete confirmedUser.password;
      return res.status(200).json({ user: confirmedUser, token });
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.getCurrentUser = (req, res, next) => {
  // If our code gets here, it went through our middleware
  // first so we should have our email address of the logged in person through req.user.
  User.findOne({ email: req.user }).then((user) => {
    // Respond with the user data (password isn't included in findOne)
    return res.json({ user });
  });
};
