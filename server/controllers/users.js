exports.signUpUser = (req, res) => {
  // Hash the password so we're not saving as plaintext
  // create a row to the DB user table
  // create our token by using jwt.sign
  // reminder that the PW shouldn't be included
};

exports.signInUser = (req, res) => {
  // I need this for line 37 to "see" confirmedUser
  // Look in our user table to find a user with an email that matches our request body
  // if there's a match...
  // make a copy of the user for later
  // check if the user table password match the login form password. (it returns a promise)
  // if it's not a match, return a 400
  // but it is a match, so create our token
  // Don't give the password, even if it's hashed!
  // Return a 200 with our user and token
  // if there are errors in our promise, return a 500
};

exports.getCurrentUser = (req, res, next) => {
  // If our code gets here, it went through our middleware
  // first so we should have our email address of the logged in person through req.user.
  // Respond with the user data (password isn't included in findOne)
};
