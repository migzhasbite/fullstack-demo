# How are we implementing Auth?

We're going to create middleware that will verify appropriate authorization headers.

- if there's no authorization header, return a 403
- if the header has `Bearer [TOKEN-NAME]` then verify the token using `jwt.verify`.
  - doesn't verify? It's a 401.
  - if it does, then decode the token, store it in `req.user` and pass it along

## Scenarios

### A user creates a new account or logs in

Good news -- logging in and signing up don't require authentication! (You don't need to login to log in, right?) However, we do need to respond back to the client with a token. Here's how:

- LOGGING IN: The server looks up the user by email (login) then uses bcrypt's `compare` method to check if the password is legit.

- SIGNING UP: The server creates the user, then hashes the password before saving the row to the database.

- From there, we'll use the jwt `sign` method to generate our token. That token will automatically know when it's expired - in our current case, 24 hours.
- The BE will send a response to our FE -- some JSON which has some basic info about the user, and more importantly, the token.

### A user calls a protected API endpoint (and does it properly, through an Authorization Header)

- the API endpoint goes through our routes. We notice we have an `auth` middleware, so it'll run the code on `/server/middleware/auth.js` first.

- In our middleware, we'll check if the request was called with an Authorization header.

  - If not, it returns a 403.
  - If it does, we'll use the jwt `verify` method, and it uses `next()` to continue on.

## Backend API Points

Endpoints we are building out today:

### POST /api/users/register

- Creates a new user.
- Expected body: `{ email, password }`

### POST /api/users/login

- Generates and responds a JWT for the user to use for future authorization.
- Expected body: `{ email, password }`
- Response format: `{ token: "JWT_TOKEN_HERE" }`

### GET /api/users/current

- Gets information about the currently logged in user.
- If no valid JWT is provided, this route will respond with `401 Unauthorized`.
- Expected headers: `{ Authorization: "Bearer JWT_TOKEN_HERE" }`

## Vocabulary

- middleware: "software glue" -- if software is run between getting the web request and sending out the web response, that's middleware.
- `localStorage`: a client storage solution
- `sessionStorage`: like `localStorage`, except that it's cleared when the page session ends (when you close your Chrome or any other browser tab)
- cookies

NEW NPM PACKAGES

- `bcryptjs`
- `jsonwebtoken`

https://stackoverflow.com/questions/19867599/what-is-the-difference-between-localstorage-sessionstorage-session-and-cookies
