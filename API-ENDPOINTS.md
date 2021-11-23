# API Endpoints

### POST /api/users/register

Creates a new user.

- Is authentication required? no
- Expected request body: `{ email, password }`
- Expected response is `201`, with JSON consisting of the following:
  - `user`: the JS object of the user logged in, WITHOUT THE PASSWORD
  - `token`: the JWT token the server generates

### POST /api/users/login

Generates and responds a JWT for the user to use for future authorization.

- Is authentication required? no
- Expected request body: `{ email, password }`
- Expected response is `200`, with JSON consisting of the following:
  - `user`: the JS object of the user logged in, WITHOUT THE PASSWORD
  - `token`: the JWT token the server generates
- Error codes:
  - return 400 if the login email and password isn't correct
  - return 500 in any other error situation

### GET /api/users/current

Gets information about the currently logged in user.

- Is authentication required? YES
- If there is no valid token in the Authentication header, respond with `403`
- If no valid JWT is provided, this route will respond with `401 Unauthorized`.
- Expected request headers: `{ Authorization: "Bearer JWT_TOKEN_HERE" }`
- Expected response: the JSON of the user logged in, without the password field
