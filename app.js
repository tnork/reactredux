const _ = require('lodash');
const express = require('express');

const app = express();

// Route Handlers (APP: GET, POST, PUT, DELETE, PATCH)
app.get('/', function(req, res) {
  res.send('Hi there');
});

//Dynamic port binding for Heroku
app.listen(process.env.Port || 5000, function() {
  console.log('Server active on port ' + app.get('port'));
});

// module.exports = app;
