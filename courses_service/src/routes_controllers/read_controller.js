var utils    = require( '../../utils' );

// require the database, which has already been connected
var requireDB = require('../schemas/courses_db.js');
var courses_db = requireDB.getdb;
var courses_model = requireDB.getModel;
 
var model = courses_db.model('courses_model');


var root = '/courses/';




// routes.index handler
exports.returnAllCoursesInfo = function (){

	return function(req, res, next ){

	  // assign a unique ID
	  var user_id = req.cookies ?
		req.cookies.user_id : undefined;

	  model.
		find({ user_id : user_id }).
		sort( '-updated_at' ).
		exec( function ( err, models ){

			if( err ) return next( err );

			res.json(models);

		});

	}; // ends return

}; // ends exports.index






exports.returnCourseInfo = function () {
	// need this return syntax because we are passing io from app.js
	return function(req, res, next ){

		// see if the query was legal
		try{

			var name = req.query.name.toUpperCase();

			model.findOne( {name:name}, function ( err, course_found ){
				if (course_found) {
					console.log("-> "+course_found.name+" information responded to user");
					res.json(course_found);
				} else { 
					console.log ("-> "+JSON.stringify(name)+" not found");
					res.send(false);
				}
			}); //ends findOne()


		} catch (e) {

			var query = JSON.stringify(req.query);

			// if the query was "/courses"
			if (query == "{}") {
				
				console.log("-> ALL course information responded to user");
				//res.send("\nALL\n");
				returnAllCoursesInfo(req,res,next);

			// if the query was an error
			} else {

				console.log("-> Error reading Query: "+JSON.stringify(req.query));
				res.send(false);

			};

		};

	}; // ends return

}; // ends exports.




// subroutine for exports.returnCourseInfo
//		returns all courses -> i.e. http://localhost:3000/courses
returnAllCoursesInfo = function (req, res, next){

	  // assign a unique ID
	  var user_id = req.cookies ?
		req.cookies.user_id : undefined;

	  model.
		find({ user_id : user_id }).
		sort( '-updated_at' ).
		exec( function ( err, models ){

			if( err ) return next( err );

			res.json(models);

		});

}; // ends function



