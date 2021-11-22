const router = require('express').Router();

const auth = require('../middleware/auth');
const {
  signInUser,
  signUpUser,
  getCurrentUser,
} = require('../controllers/users');

/**
 * POST /api/users/signup
 */
router.post('/signup', signUpUser);

/**
 * POST /api/users/login
 */
router.post('/login', signInUser);

/**
 * @api {post} /api/users/current
 * Authentication required
 */
router.get('/current', auth, getCurrentUser);

module.exports = router;
