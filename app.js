const _ = require('lodash');
const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
// Cpuld make one line belo with require('./routes/authRoutes')(app);


const app = express();
authRoutes(app);

app.set('port', (process.env.Port || 3000));
require('./routes/authRoutes')(app);

//Dynamic port binding for Heroku
app.listen(process.env.PORT || 3000, function() {
  console.log('Server active on port ' + app.get('port'));
});
