var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');

//Pub Sub dependency
var redis = require("redis")

client1 = redis.createClient() // Publishes to ri channel
client2 = redis.createClient() // Subscribes to student channel

// Database-related dependencies
var Promise = require('bluebird');
var MongoDB = Promise.promisifyAll(require('mongodb'));
var MongoClient = Promise.promisifyAll(MongoDB.MongoClient);


var init = require('./config/init')();
var config = require('./config/config');
var routes = require('./routes');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('showStackError', true);

// Environment dependent middleware
if (process.env.NODE_ENV === 'development') {
  // Enable logger (morgan)
  app.use(logger('dev'));

  // Disable views cache
  app.set('view cache', false);
} else if (process.env.NODE_ENV === 'production') {
  app.locals.cache = 'memory';
}

MongoClient.connect(config.db, { promiseLibrary: Promise }, (err, db) => {
  if (err) {
    logger.warn("Failed to connect to the database. ${err.stack}");
  }
  app.locals.db = db;
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
    console.log(err.message);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

server.listen(config.port);
module.exports = app;
console.log('Server has started on port ' + config.port);

// *** Pub Sub Activity ***
var test = "test"
var test_message = JSON.stringify({"message": "update student add course", "uni": "jc4267", "course_name": test })
//client.publish("ri channel", "I am sending a message from Jonathan.");
client1.publish("ri channel", test_message);

client2.on("subscribe", function () {
    console.log("Subscribed to student channel...")
});

client2.subscribe("student channel");

client2.on("message", function (channel, message) { // Listens for ri channel JSON messgages

    console.log("client1 channel " + channel + ": " + message);
    obj = JSON.parse(message)
    console.log("event recieved is: " , obj.message)

    // Parse the JSON message and publish message to student or course channel
    if (obj.message == "blah") {
        // Parse JSON and do action to database
    }

    else if (obj.message == "blah") {
        
    }

    else if (obj.message == "blah") {
        
    }

});


