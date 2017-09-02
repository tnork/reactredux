var express = require('express');
var path = require('path');
// var exphbs = require('express-handlebars');
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

var app = express();

// var hbs = exphbs.create({ /* config */ });

// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname+ '/node_modules/bootstrap/dist/css'));

// app.engine('handlebars', exphbs({extname: 'handlebars', defaultLayout:'main', partialsDir: __dirname + '/views/partials/',
// helpers: { //Helper is used to ease stringifying JSON
//  toJSON : function(object) {
//  return JSON.stringify(object);
//  }
// }}));

// app.set('view engine', 'handlebars');

app.set('port', (process.env.Port || 3000));

//Custom Middleware
app.use(function(req, res, next){
  console.log('Time : ' + Date.now());
  next();
});

app.use(logger('dev'));  // Dev Testing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.get('/', function(req, res, next){

  var data = {

  };

  res.send('Hi');
  // res.render('contact', data);
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

module.exports = app;
