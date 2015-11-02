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
	app.put(  root,									update_controller.updateCourse() );


	// delete 
	app.delete(  root, 								delete_controller.removeCourse() ); 
	app.delete( root + '/:course' ,					delete_controller.removeStudentFromCourse() );
	app.delete( '/student',							delete_controller.removeStudent() );


	// config - schema changes
	app.post( '/schema'+root,    					schema_controller.addKEY() );
	app.delete( '/schema'+root,    					schema_controller.deleteKEY() );
	//app.put( root+'/:course/:attribute',			attributes_controller.updateKeyInAttributes() );

};
