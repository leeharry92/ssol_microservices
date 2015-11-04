var async = require('async');
var request = require('request')
//var express = require('express');
var config = require('../config/config');
var host = 'localhost';

exports.getStudent = function(req, res){
	var id = req.params.id;

	async.parallel([
    
    function(callback) {
      var fullUrl = req.protocol + '://' + host + ':' + config.students_port + '/' + id;
      console.log(fullUrl);
      request(fullUrl, function(err, response, body) {
        // JSON body
        if(err) { console.log(err); callback(true); return; }
        obj = JSON.parse(body);
        callback(false, obj);
      });    
    },
    
    // function(callback) {
    //   //var url = "http://external2.com/api/some_endpoint";
    //   console.log(req.url + 'lhfq');
    // },
  ],
  /*
   * Collate results
   */
  function(err, results) {
    if(err) { console.log(err); res.send(500,"Server Error"); return; }
    res.send({api1:results[0], api2:results[1]});
  }
  );

};
