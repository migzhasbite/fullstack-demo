module.exports = (req, res, next) => {
  // read the authorization header in the request and parse the token
  // if there's no token, return a 403
  // otherwise, use jwt.verify to verify our token against the secret
  // if the secret is legit, slip the email in our request as req.user and move on
  // if verify fails, return a 401 Authentication Failed
};
