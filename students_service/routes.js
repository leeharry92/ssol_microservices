var express = require('express');
var router = express.Router();
var students = require('./students_controller');
var redis = require('redis');
var config = require('./config/config');


clientRISub = redis.createClient(); // Subscribes to ri channel

var subChannel = "students_micro_service";

clientRISub.subscribe(subChannel);

clientRISub.on("subscribe", function (channel, count) {
    console.log("Subscribed to " + channel + " channel.")
});


module.exports = function(app) {
    app.route('/')
        .get(students.find)
        .post(students.create);

    app.route('/attributes')
        .post(students.add_attribute)
        .delete(students.add_attribute);

    app.route('/:uni')
        .get(students.show)
        .delete(students.remove)
        .put(students.update);

    app.route('/:uni/add-course')
        .put(students.add_course);

    app.route('/:uni/remove-course')
        .put(students.remove_course);

    clientRISub.on("message", function (channel, message) { // Listens for referential integrity channel JSON messgages
        console.log("Channel name: " + channel);
        console.log("Message: " + message);
        
        //Switch statement for three RI cases
        var obj = JSON.parse(message);
        var call_number = parseInt(obj.course_num);

    switch (obj.service_action) {
        case "update student add course":
            var uni = obj.uni.toLowerCase();
            var firstChar = uni.charAt(0);
            if (firstChar < config.starting_uni || firstChar > config.ending_uni) {
                console.log("UNI received from MQ is out of bounds");
                return;
            }
            students.ref_add_course(call_number, uni, app, function(err) {
                if (err != null) {
                    console.log("error");
                } else {
                    //handle correct case
                }
            });
            break;

        case "update student delete course":
            var uni = obj.uni.toLowerCase();
            var firstChar = uni.charAt(0);
            if (firstChar < config.starting_uni || firstChar > config.ending_uni) {
                console.log("UNI received from MQ is out of bounds");
                return;
            }
            students.ref_remove_course(call_number, uni, app, function(err) {
                if (err != null) {
                    //error handling
                } else {
                    //handle correct case
                }
            });
            break;

        case "delete course":
            students.ref_remove_course_on_all_students(call_number, app, function(err) {
                if (err != null) {
                    //error handling
                } else {
                    //handle correct case
                }
            });
            break;
        }
    });   
};