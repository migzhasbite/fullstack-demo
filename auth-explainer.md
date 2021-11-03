# How are we implementing Auth?

### A user creates their new sign in

### A user logs and have credentials

1. FE: user makes a call to the login API
2. BE: gets the FE API request, looks up the user by email, then uses the bcrypt compare method to check if the password is legit. If so, we've got some tasks to do:
   - We'll use the bcrypt sign method to generate our token. That token will automatically know when it's expired - in our current case, 24 hours.
   - The BE will send a response to our FE -- some JSON which has some basic info about the user, and more importantly, a token.
3. FE: gets the token in that API response and saves it to `sessionStorage`

### A user uses their React App to access a protected page

1. FE: in App, we're using router to get to a protected page. That component is most likely wrapped in <ProtectedRoute />, a higher-order component. First and foremost it'll check if we have a token. If so we'll go to that component. If not, it redirects.
2. FE: a person makes an axios request to that protected page/API
   - FE: You'll get the token from `sessionStorage` and add that in an axios authorization header

## The many, many, many ways we can do this

- cookies versus sessions

## Vocabulary

`sessionStorage`  
: like `localStorage`, except that it's cleared when the page session ends (when you close your Chrome or any other browser tab)
