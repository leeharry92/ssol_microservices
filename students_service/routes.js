var express = require('express');
var router = express.Router();
var students = require('./students_controller');
var redis = require("redis")

clientSub = redis.createClient();	// Subscribes to ri channel

clientSub.subscribe("students microservice");

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

	clientSub.on("subscribe", function (channel, count) {
    console.log("Subscribed to " + channel + " channel.")
	});

	clientSub.on("message", function (channel, message) { // Listens for referential integrity channel JSON messgages
	    console.log("Channel name: " + channel);
	    console.log("Message: " + message);
	    
	    //Switch statement for three RI cases
	    var obj = JSON.parse(message);
	    var call_number = 8765;
	    var uni = obj.uni.toLowerCase();

	    switch (obj.action) {
	        case "update student add course":
	        	students.ref_add_course(call_number, uni, app);
	        	break;

	        case "update student delete course":
	        	students.ref_remove_course(call_number, uni, app);
	        	break;

	        case "delete course":
	        	students.ref_remove_course_on_all_students(call_number, app);
	        	break;
    	}
	});   
};
