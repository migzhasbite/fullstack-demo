# How are we implementing Auth?

We're going to create middleware that will verify appropriate authorization headers.

- if there's no authorization header, return a 403
- if the header has `Bearer [TOKEN-NAME]` then verify the token using `jwt.verify`.
  - doesn't verify? It's a 401.
  - if it does, then decode the token, store it in `req.user` and pass it along

### A user creates a new account or logs in

Good news -- logging in and signing up don't require authentication! (You don't need to login to log in, right?) However, we do need to respond back to the client with a token. Here's how:

- LOGGING IN: The server looks up the user by email (login) then uses bcrypt's `compare` method to check if the password is legit.

- SIGNING UP: The server creates the user, then hashes the password before saving the row to the database.

- From there, we'll use the jwt `sign` method to generate our token. That token will automatically know when it's expired - in our current case, 24 hours.
- The BE will send a response to our FE -- some JSON which has some basic info about the user, and more importantly, the token.

### A user calls a protected API endpoint (and does it properly, through an Authorization Header)

- the API endpoint goes through our routes. We notice we have an `auth` middleware, so it'll run the code on `/server/middleware/auth.js` first.

4. BE: In our middleware, we'll checks if the request was called with an Authorization header.
   - If not, it returns a 403.
   - If it does, we'll use the jwt `verify` method, and it uses `next()` to continue on.

## The many, many, many ways we can do this

- cookies versus sessions

## Vocabulary

- middleware:
- `localStorage`: a client storage solution
- `sessionStorage`: like `localStorage`, except that it's cleared when the page session ends (when you close your Chrome or any other browser tab)
- cookies

https://stackoverflow.com/questions/19867599/what-is-the-difference-between-localstorage-sessionstorage-session-and-cookies
