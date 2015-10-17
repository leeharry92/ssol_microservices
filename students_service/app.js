var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var Promise = require('bluebird');

var init = require('./config/init')();
var config = require('.config/config');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('showStackError', true);

// Environment dependent middleware
if (process.env.NODE_ENV === 'development') {
	// Enable logger (morgan)
	app.use(morgan('dev'));

	// Disable views cache
	app.set('view cache', false);
} else if (process.env.NODE_ENV === 'production') {
	app.locals.cache = 'memory';
}

MongoClient.connect(config.db, { promiseLibrary: Promise }, (err, db) => {
  if (err) {
    logger.warn(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db;
  app.listen(PORT, () => {
    const { address, port }  = app.address();
    logger.info(`Node.js server is listening at http://${address}:${port}`);
  });
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});