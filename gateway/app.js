var express = require('express');
var fs = require('fs');
var http = require('http');
var request = require('request');
var async = require('async');
var Regex = require("regex");

var app = express();
var config = require('./config/config');

//var students_port = 3000;

app.configure(function(){
  app.use(express.bodyParser());
});

//require('./models/musician')
require('./routes')(app);

app.get('/', function(req, res) {
console.log(req.url);
res.send('Router working\n');
});

app.listen(config.port);
console.log('Listening on port ' + config.port);


//var str = "something/students/info";
var exp_students = '(.*)/students/(.*)';
var regex_students = new RegExp(exp_students);