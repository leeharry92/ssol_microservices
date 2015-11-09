


var redis = require("redis")

clientRISub = redis.createClient(); // Subscribes to ri channel

var subChannel = "courses_micro_service";

clientRISub.subscribe(subChannel);

clientRISub.on("subscribe", function (channel, count) {
    console.log("Subscribed to " + channel + " channel.")
});




module.exports = function(app){




	// ROUTING FOR COURSES
	var schema_controller = require('./routes_controllers/schema_controller');
	var read_controller = require('./routes_controllers/read_controller');
	var update_controller = require('./routes_controllers/update_controller');
	var delete_controller = require('./routes_controllers/delete_controller');


	var root = '/courses';


	// create
	app.post( root,    								schema_controller.createCourse() );

	// read
	app.get(  root,		            				read_controller.returnCourseInfo() );


	// update -- includes adding students to a course
	app.put(  root+'/:course_num',					update_controller.updateCourse() );
	app.post(  root+'/:course_num/:resource',		update_controller.addStudentToCourse() );
	//app.put(  root+'/:course_num/:students/:uni',	update_controller.updateStudentInCourse() );



	// delete 
	app.delete(  root, 								delete_controller.removeCourse() ); 
	//app.delete( root + '/:course_num' ,					delete_controller.removeStudentFromCourse() );
	app.delete( root + '/:course_num/:resource' ,update_controller.removeStudentFromCourse() );
	app.delete( '/student',							delete_controller.removeStudent() );


	// config - schema changes
	app.post( '/schema'+root,    					schema_controller.addKEY() );
	app.delete( '/schema'+root,    					schema_controller.deleteKEY() );
	//app.put( root+'/:course/:attribute',			attributes_controller.updateKeyInAttributes() );





    clientRISub.on("subscribe", function (channel, count) {
        console.log("Subscribed to " + channel + " channel.")
    });

    clientRISub.on("message", function (channel, message) { // Listens for referential integrity channel JSON messgages
        console.log("Channel name: " + channel);
        console.log("Message: " + message);
        
        //Switch statement for three RI cases
        var obj = JSON.parse(message);
        var call_number = 1234;
        var uni = obj.uni.toLowerCase();

        switch (obj.service_action) {
            case "update course add student":
                //students.ref_add_course(call_number, uni, app, function(err) {
                var res, params, collectionQuery, resource, resourceQuery, clientQuery;
                update_controller.POSTresource( res, params, collectionQuery, resource, resourceQuery, clientQuery, function (err) {	
                    if (err != null) {
                        //error handling
                    } else {
                        //handle correct case
                    }
                });
                break;

            case "update course delete student":
                //students.ref_remove_course(call_number, uni, app, function(err) {
                update_controller.removeStudentFromCourse( function(err) {	
                    if (err != null) {
                        //error handling
                    } else {
                        //handle correct case
                    }
                });
                break;
/*
            case "delete student":
                //students.ref_remove_course_on_all_students(call_number, app, function(err) {
                model.dele	
                    if (err != null) {
                        //error handling
                    } else {
                        //handle correct case
                    }
                });
                break;
 */               
        }
    });  






};
