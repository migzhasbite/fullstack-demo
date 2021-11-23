OBJECTIVES

- understand what authentication is, why it's important
- differentiate between authentication and authorization
- explain various authentication options
- understand what a JWT is

VOCAB

- `JWT`
- `sessionStorage`: like `localStorage` except that it is cleared when the page session ends meaning when you close
  your chrome tab or any other browser tab

## SCENARIOS FROM A CLIENT POV

You're building a web application. It has a DB table which contains users with passwords. How can you make sure any pages on your website is ONLY accessed by verified users of your website?

### SCENARIO A: LOGGING IN

1. A user logins into a form with a User ID and a Password
2. We'll call a login API
   - If the user is NOT in the DB it'll return a 403
   - If the user IS in the DB it'll have user info but it will also have a TOKEN!
3. The login component gets the results of that API call

   - Did the API return a 403?

     - set the state `success` to false which will trigger turning on the error message in the form

   - Was the API call successful?
     - set the token to `sessionStorage`
     - set the state `success` to true which will trigger a `<Redirect />`

### SCENARIO B: SOMEONE GOES TO A PRIVATE PAGE (DASHBOARD) BUT ISN'T LOGGED IN

1. A user gets to a page using `react-router`
2. The React component checks for a session token in Dashboard.js
3. There is no token - set the `failedAuth` state to `true`
4. That will trigger a render to say you must be logged in

### SCENARIO C: SOMEONE GOES TO A PRIVATE PAGE (DASHBOARD) AND IS LOGGED IN

1. A user gets to a page using `react-router`
2. The React component checks for a session token
3. There is a token! Load up the appropriate page component
4. That page may need to call an API that needs authentication (more on that tomorrow)
   - make the axios call; be sure to have `{ Authorization: "Bearer JWT_TOKEN_HERE" }` in the headers
   - The API should return with data about out user. We'll use that to update `user` and `failedAuth` states

### SCENARIO D: SOMEONE ATTEMPTS TO LOGOUT

1. A user calls the `handleLogout()` method on Dashboard
2. Remove our `token` from `sessionStorage`
3. set the state `success` to true which will trigger a `<Redirect />`

---

RESOURCES

- https://ui.dev/react-router-v4-protected-routes-authentication
