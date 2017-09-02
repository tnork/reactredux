const _ = require('lodash');
const express = require('express');

const app = express();

//Dynamic port binding for Heroku
app.set('port', process.env.Port || 5000);

// Route Handlers (APP: GET, POST, PUT, DELETE, PATCH)
app.get('/', function(req, res) {
  res.send('Hi there');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render('error');
});

app.listen(app.get('port'), function() {
  console.log('Server active on port ' + app.get('port'));
});

// module.exports = app;
