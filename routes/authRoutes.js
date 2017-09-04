const passport = require('passport');

module.exports = function(app) {

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

  // For authenticated users
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

    app.get('/api/logout', (req, res) => { // Has req.user object
      req.logout(); // Passport function that takes id in cookie and eliminates it
      res.send(req.user); // Sends back undefined or no content
    });

};
