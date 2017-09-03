const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

require('./models/user'); // Have to require data models to declare before services using those
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

// URI from mLab
mongoose.connect(keys.mLabMongoURI);

const app = express();
authRoutes(app);

app.set('port', (process.env.Port || 3000));
require('./routes/authRoutes')(app);

//Dynamic port binding for Heroku
app.listen(process.env.PORT || 3000, function() {
  console.log('Server active on port ' + app.get('port'));
});
