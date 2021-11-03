const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'No token. Unauthorized.' });
    }
    if (jwt.verify(token, process.env.JWT_SECRET)) {
      req.decode = jwt.decode(token);
      next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};
