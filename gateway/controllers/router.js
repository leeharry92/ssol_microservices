var async = require('async');
var request = require('request')
//var express = require('express');
var config = require('../config/config');
var host = 'localhost';

exports.findStudent = function(req, res) {
  async.parallel([ 
    function(callback) {
      var fullUrl = req.protocol + '://' + host + ':' + config.students_port + req.url;
      console.log(fullUrl);
      request(fullUrl, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); callback(true); return; }
        obj = JSON.parse(body);
        callback(false, obj);
      });    
    },
  ],
  function(err, results) {
    if(err) { console.log(err); res.send(500,"Server Error"); return; }
    res.send(results[0]);
  }
  );
};
exports.createStudent = function(req, res) {
      var fullUrl = req.protocol + '://' + host + ':' + config.students_port + req.url;
      console.log(fullUrl);
      request.post({ url: fullUrl, form: req.body }, function(err, response, body) {
        //console.log(response);
      if (err) { return res.status(500).end('Error'); }
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(body);
      });
};
exports.deleteStudent = function(req, res) {
  console.log('Inside deleteStudent');
  var fullUrl = req.protocol + '://' + host + ':' + config.students_port + req.url;
    console.log(fullUrl);
    request.del({ url: fullUrl}, function(err, response, body) {
        if (err) { return res.status(500).end('Error'); }
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(body);
    });
};
exports.deleteAttribute = function(req, res) {
  console.log('Inside deleteAttribute');
  var fullUrl = req.protocol + '://' + host + ':' + config.students_port + req.url;
    console.log(fullUrl);
    request.del({ url: fullUrl, form: req.body }, function(err, response, body) {
        if (err) { return res.status(500).end('Error'); }
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(body);
    });
};
exports.updateStudent = function(req, res) {
  console.log('Inside updateStudent');
  var fullUrl = req.protocol + '://' + host + ':' + config.students_port + req.url;
    console.log(fullUrl);
    request.put({ url: fullUrl, form: req.body }, function(err, response, body) {
        if (err) { return res.status(500).end('Error'); }
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(body);
    });
};
exports.findCourse = function(req, res){
  //console.log(req);
  async.parallel([   
    function(callback) {
      //TODO: '/courses' should be removed later
      var fullUrl = req.protocol + '://' + host + ':' + config.courses_port + '/courses' + req.url;
      console.log(fullUrl);
      request(fullUrl, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); callback(true); return; }
        obj = JSON.parse(body);
        callback(false, obj);
      });    
    },
  ],
  function(err, results) {
    if(err) { console.log(err); res.send(500,"Server Error"); return; }
    res.send(results[0]);
  }
  );
};
exports.createCourse = function(req, res) {
  //console.log('Inside createStudent');
  var fullUrl = req.protocol + '://' + host + ':' + config.courses_port + '/courses' + req.url;
  console.log(fullUrl);
  request.post({ url: fullUrl, form: req.body }, function(err, response, body) {
        if (err) { return res.status(500).end('Error'); }
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(body);
    });
};
