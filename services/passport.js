const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys'); //Back into server folder then config

//Don't require in Mongoose model code, creates chaos with testing Mocha Jest etc
const mongoose = require('mongoose');
const User = mongoose.model('users');  //model class

// Puts identifying information in the cookie, turns user into an id
passport.serializeUser((user, done) => {
  done(null, user.id); // uses done, No err so null sends user ID from db
  // ID  is passed to follow up requests, this is the ID from MongoDB for the record, not the Google ID because want to keep generic for other auth flows
});

// Removes cookie and returns mongoose class user, deserializes ID back to user
passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

// Strategies
passport.use(
  new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
  // Incoming route after Google grants permission to the user

}, (accessToken, refreshToken, profile, done) => {
  // Callback to capture token/code after Google responds to original authentication request
  // console.log('Access token : ' + accessToken);
  // console.log('Refresh token : ' + refreshToken);
  // console.log('Profile token : ' + JSON.stringify(profile));
  // If allowed, refresh token allows quickly to refresh access token without authorizing again
  // Calls done to proceed with authentication flow

  User.findOne({googleID: profile.id}) // The query returns a promise, not a user object
    .then((existingUser) => { // existingUser is either null
      if (existingUser) {
        // already have user
        done(null, existingUser); // done requires err/null, then user record
      } else {
        // Save to MongoDB
        new User({googleID: profile.id, firstName: profile.name.givenName, lastName: profile.name.familyName})
          .save()  // Creates a new instance of user, saves
          .then(user => done(null, user)); // In callback get second model instance, same underlying model but always use one in the promise callback from db
      }
    });

  })
);
