const _ = require('lodash');
const express = require('express');

const app = express();

//Dynamic port binding for Heroku
app.set('port', (process.env.Port || 5000));

// Route Handlers (APP: GET, POST, PUT, DELETE, PATCH)
app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});

app.listen(app.get('port'), function() {
  console.log('Server active on port ' + app.get('port'));
});

module.exports = app;
