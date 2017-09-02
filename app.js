const _ = require('lodash');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
app.set('port', (process.env.Port || 3000));

// Strategies
passport.use(
  new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
  // Incoming route after Google grants permission to the user

}, (accessToken, refreshToken, profile, done) => {
  // Callback to capture token/code after Google responds to original authentication request
  console.log('Access token : ' + accessToken);
  console.log('Refresh token : ' + refreshToken);
  // If allowed, refresh token allows quickly to refresh access token without authorizing agian
  console.log('Profile token : ' + JSON.stringify(profile));

  // Save to MongoDB

  })
);

// Route Handlers (APP: GET, POST, PUT, DELETE, PATCH)

// App directs users to Google via Passport to authenticate
// scope specifies access from Google for profile and email
app.get('/auth/google', passport.authenticate('google',{
  scope: ['profile', 'email']
  })
);

// Route for incoming response from Google, callback url includes the code
// This route, when request is pushed to Google again, it also includes the code
// to receive their actual user data in the scope above
app.get('/auth/google/callback', passport.authenticate('google'));


//Dynamic port binding for Heroku
app.listen(process.env.PORT || 3000, function() {
  console.log('Server active on port ' + app.get('port'));
});

// module.exports = app;
