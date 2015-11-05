var utils    = require( '../../utils' );

// require the database, which has already been connected
var requireDB = require('../schemas/courses_db.js');
var courses_db = requireDB.getdb;
var courses_model = requireDB.getModel;
 
var model = courses_db.model('courses_model');

var redis = require("redis")
clientRI = redis.createClient() // Publishes to ri channel

var root = '/courses/';




exports.removeStudent = function( ) {

  return function ( req, res, next ){

  try {

	// local variable to store the course name, which comes from the url /courses/<coursename>
	  var students_request = req.body.students;

	  // convert JSON REQUEST to Upper Case
		JSON.stringify(students_request, function (key, value) {
		  if (value && typeof value === 'object') {
			var replacement = {};
			for (var k in value) {
			  if (Object.hasOwnProperty.call(value, k)) {
				value[k] = value[k].toUpperCase();
				replacement[k && k.charAt(0).toLowerCase() + k.substring(1)] = value[k].toUpperCase();
			  }
			}
			return replacement;
		  }
		  return value;
		});


	// Store local variables
	  var lastname = students_request.lastname;
	  var firstname = students_request.firstname;

	// First find the course in the db model
	  model.find({}, function(err, course_found){

	// If the course exists, check student entries to make sure no duplicate exists

		course_found.forEach( 

		  function( coursedata ) {

			coursedata.collection.aggregate( [
				{"$match"	: {name : coursedata.name} }
				,{"$unwind"	: "$students" }
				,{"$match"	: {"students.lastname" : lastname} }
				,{"$match"	: {"students.firstname": firstname} }
			],
				function (err_lastname, student_found){

				// If the entry already exists
					if (student_found.length > 0 ) {

					// pull (remove) the student from the student collection withing the course 
						coursedata.update(  {
							$pull: {
								students: {	
									lastname: lastname,
									firstname: firstname
								}
							} // ends $pull
						}, function (e, s){
							if (s){
								console.log('-> '+lastname+', '+firstname+' removed from '+coursedata.name);
								//res.send(true);

								// Publish to to the referential integrity that the course has been updated
								// with a student
								students_request["sender"] = 'courses_micro_service';
								students_request["action"] = 'update student remove course';
								var message =JSON.stringify(students_request)

		            			clientRI.publish("referential integrity", message)
							} else {
								console.log('-> Error removing '+lastname+', '+firstname+' from '+coursedata.name+'.');
								//res.send(false);
							}
						});


				// If the student entry does not exist
					} else	{		

						console.log('-> '+lastname+', '+firstname+' does not exist in '+coursedata.name+'.');
						//res.send(false);

					};
			}); // ends collection.aggregate

		}); // ends .forEach()

		res.send(true);

	 }); // ends model.findOne

  } catch (e){
	console.log(e);
	res.send(false);
  }

  }; // ends return

}; // ends exports.updateCourse





exports.removeStudentFromCourse = function( ) {

  return function ( req, res, next ){

  try {

	// local variable to store the course name, which comes from the url /courses/<coursename>
	var name = req.params.course.toUpperCase();

	  var students_request = req.body.students;

	  // convert JSON REQUEST to Upper Case
		JSON.stringify(students_request, function (key, value) {
		  if (value && typeof value === 'object') {
			var replacement = {};
			for (var k in value) {
			  if (Object.hasOwnProperty.call(value, k)) {
				value[k] = value[k].toUpperCase();
				replacement[k && k.charAt(0).toLowerCase() + k.substring(1)] = value[k].toUpperCase();
			  }
			}
			return replacement;
		  }
		  return value;
		});


	// Store local variables
	  var lastname = students_request.lastname;
	  var firstname = students_request.firstname;

	// First find the course in the db model
	  model.findOne({name: name}, function(err, course_found){

	// If the course exists, check student entries to make sure no duplicate exists
		if (course_found) { 
			course_found.collection.aggregate([
				{"$match"	: {name : name} }
				,{"$unwind"	: "$students" }
				,{"$match"	: {"students.lastname" : lastname} }
				,{"$match"	: {"students.firstname": firstname} }
			],
				function (err_lastname, student_found){

			// If the entry already exists
					if (student_found.length > 0 ) {

					// pull (remove) the student from the student collection withing the course 
						model.findOneAndUpdate( {name:name}, {
							$pull: {
								students: {	
									lastname: lastname,
									firstname: firstname
								}
							} // ends $pull
						}, function (e, s){
							if (s){
								console.log('-> '+lastname+', '+firstname+' removed from '+name);
								res.send(true);
							} else {
								console.log('-> Error removing '+lastname+', '+firstname+' from '+name+'.');
								res.send(false);
							}
						});

			// If the student entry does not exist
					} else	{		

						console.log('-> '+lastname+', '+firstname+' does not exist in '+name+'.');
						res.send(false);

					};
			}); // ends collection.aggregate

	// If the course does not exist
		} else {

			console.log('-> '+name+' doesnt exist.');
			res.send(false);

		}; // ends else

	 }); // ends model.findOne

  } catch(e) {
	console.log(e);
	res.send(false);
  }

  }; // ends return

}; // ends exports.updateCourse








exports.removeCourse = function () {
    return function(req, res, next) {

	  try{

		// local variable to save the query
		var name = req.query.name.toUpperCase();

		model.findOne( {name: name}, function ( err, destroy_model ){
			var user_id = req.cookies ?
			   req.cookies.user_id : undefined;

			/*
				if( model.user_id !== user_id ){
				  return utils.forbidden( res );
				}
			*/

			// if the course does exist, then delete it
			if (destroy_model != null) {

				destroy_model.remove( function ( err, destroy_model ){

				  	if (destroy_model) {
						console.log('-> '+name+' removed');
						res.send(true);

					// there was an error deleting
					} else {
						console.log("-> Error deleting "+name);
						res.send(false);
					}

				}); // ends .remove()
			
			// if the course does not exist, then return an error
			} else {

				console.log("-> "+name+" cannot be removed because it does not exist");
				res.send(false);

			}; // ends else
				
		}); // ends findOne

	  } catch (e){
		console.log(e);
	  }

    }; // ends return

}; // ends remove course






