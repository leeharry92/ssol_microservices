var utils    = require( '../../utils' );

// require the database, which has already been connected
var requireDB = require('../schemas/courses_db.js');
var courses_db = requireDB.getdb;
var courses_model = requireDB.getModel;
 
var model = courses_db.model('courses_model');



var root = '/courses/';




exports.updateCourse = function( ) {

  return function ( req, res, next ){


// FIRST, TRY UPDATING THE STUDENT DOCS IN THE COURSE DB
  try {
	  var name = req.query.name.toUpperCase();
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

	if ( (typeof lastname === 'undefined') || (typeof firstname === 'undefined') ) {
	    throw new Error("Either students.lastname or students.firstname is undefined");
	};


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

						console.log('-> '+lastname+', '+firstname+' is already enrolled in '+name+'.');
						res.send(false);

			// If the student entry does not exist, add it to the db
					} else	{		

						course_found.students.push(students_request);				
						course_found.save();
						console.log('-> '+lastname+', '+firstname+' is added to '+name+'.');
						res.send(true);

					};
			}); // ends model.findOne

	// If the course does not exist
		} else {

			console.log('-> '+name+' doesnt exist.');
			res.send(false);

		};

	 }); // ends model.findOne



// IF THE STUDENT UPDATE FAILS, THEN PERHAPS THE USER WISHES TO UPDATE ANOTHER REQUEST 
  } catch(e) {
	console.log(e);

		try{
			if (typeof req.body.students === 'object'){

				throw new Error("invalid students entry");

			};

		  // Iterate through the requests within the body
			for(var key in req.body) {
			  if(req.body.hasOwnProperty(key)){

			// store the key-value pair to be PUT
			  var path = key;
			  var update = {};
			  update[path] = req.body[key].toUpperCase(); 
				// use update[path] = { text: 'test test' }; if you want to put a field

			// store the key-value pair to be 
			  var update_exists = {};
			  update_exists[path] = { $exists : true };


			// check if the field exists in the schema
				model.findOne(update_exists, function (find_err, result){

					if (find_err) return find_err;

					if ( result != null ) {

							model.findOneAndUpdate( {name:name}, {
								$set: update//req.body[key]
							}, function (e, s){
								if (s){

									console.log('-> {'+key+' : '+req.body[key]+'} saved in '+name);
									res.send(true);

								} else {
								
									console.log('-> Error saving {'+key+' : '+req.body[key]+'} in '+name);
									res.send(false);

								}
							});

					} else {

						console.log('-> '+key+' key does not exist in schema');
						res.send( false );

					};

				}); // ends .findOne()

			  } // ends if

			} // ends for loop

		} catch(e2){
			console.log(e2);
			res.send(false);
		}

    } // ends outer catch

  }; // ends return

}; // ends exports.updateCourse



