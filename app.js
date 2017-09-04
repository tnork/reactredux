const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

//  Enables cookies, allows passport to use them here and in passport.js
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/User'); // Have to require data models to declare before services using those
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

// Middleware

mongoose.connect(keys.mLabMongoURI); // URI from mLab

const app = express();

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, // Sets cookie expiration, 30 days in milliseconds
      keys: [keys.cookieKeys] // Hidden array of encrypted cookie keys, has multiple keys for users
    })
);

app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

app.set('port', (process.env.Port || 3000));

app.listen(process.env.PORT || 3000, function() {   //Dynamic port binding for Heroku
  console.log('Server active on port ' + app.get('port'));
});
