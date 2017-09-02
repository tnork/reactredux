const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys'); //Back into server folder then config

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
