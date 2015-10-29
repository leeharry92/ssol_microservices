module.exports = function(app){

	// ROUTING FOR COURSES
	var create_controller = require('./routes_controllers/create_controller');
	var read_controller = require('./routes_controllers/read_controller');
	var update_controller = require('./routes_controllers/update_controller');
	var delete_controller = require('./routes_controllers/delete_controller');

	var schema_controller = require('./routes_controllers/schema_controller');

	var root = '/courses';


	// create
	app.post( root,    								create_controller.createCourse() );

	// read
	app.get(  root,		            				read_controller.returnCourseInfo() );


	// update -- includes adding students to a course
	app.put(  root,									update_controller.updateCourse() );


	// delete 
	app.delete(  root, 								delete_controller.removeCourse() ); 
	app.delete( root + '/:course' ,					delete_controller.removeStudentFromCourse() );
	app.delete( '/student',							delete_controller.removeStudent() );


	// config - schema changes
	//app.post( root+'/schema',    					schema_controller.addKeytoSchema() );

};
