const auth = require('../middleware/auth');
const router = require('express').Router();

/**
 * @api {post} /api/users/current
 * Authentication required
 */
router.get('/current', auth, (req, res, next) => {});

module.exports = router;
