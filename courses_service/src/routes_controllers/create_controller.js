var utils    = require( '../../utils' );

// require the database, which has already been connected
var requireDB = require('../schemas/courses_db.js');
var courses_db = requireDB.getdb;
var courses_model = requireDB.getModel;
 
var model = courses_db.model('courses_model');
var paths = ["user_id","name", "students", "updated_at"];

var root = '/courses/';



// READ IN CONFIG FILE
var pathToConfigJSON = '/../../config/config.json';
var fs    = require('fs'),
nconf = require('nconf');
nconf.argv()
  .env()
  .file({ file: pathToConfigJSON });


exports.deleteKEY = function( ){


  return function ( req, res, next ){
  try{


	var key = req.body.key;

	if (typeof key === 'undefined'){
		throw new Error("key entry is of type 'undefined' ");
	}

	// store the key-value pair to be 
	  var update_exists = {};
	  update_exists[ key ] = { $exists : true };

	// check if the field exists in the schema
		model.findOne(update_exists, function (find_err, result){

			if (find_err) return find_err;

			if ( result != null ) {

			// search and destroy the attribute from the config file
			  var newAttributes = [];
			  var attributes = nconf.get('courseAttributes');
			  for (var i = 0; i < attributes.length; i++){
				if (attributes[i] != key){
					newAttributes.push( attributes[i] );
				}
			  }
			  nconf.set('courseAttributes', newAttributes);
			  nconf.save(function(err){});


			// destroy the attribute from the models
			  model.find({}, function(err, success){
			// need to find() then iterate through all of them to add the values

			  for (var j in success) {

				var attributes = nconf.get('courseAttributes');
				var keyValues = [req.cookies.user_id, success[j].name, success[j].students, Date.now()];	
				success[j].remove(function(err, success){});

					  for (var i = 0; i < attributes.length; i++){
						keyValues.push(null);
						paths.push( attributes[i] );


						// add the attribute to the schema
						  var path_= attributes[i];
						  var update = {};
						  update[path_] = ''; 
						  courses_model.add( update );

					  }

					// go to create course
					createCourseHandler(model, paths, keyValues);

					// Reset the paths variable for each iteration
					paths = ["user_id","name", "students", "updated_at"];
					
			  } // ends for loop



				console.log('-> '+key+' key removed from schema');
				res.send(true);

			  }); // ends model.findOne


			} else {
				console.log('-> '+key+' key cannot be removed from schema because it does not exist');
				res.send(false);

			} // ends else

		}); // ends .findOne()

  } catch(e){
	console.log(e);
	res.send(false);
  }

  }; // ends return

}; // ends exports.updateCourse



exports.addKEY = function( ){

  return function ( req, res, next ){

  try{
	var key = req.body.key;

	if (typeof key === 'undefined'){
		throw new Error("key entry is of type 'undefined' ");
	}

	// store the key-value pair to be 
	  var update_exists = {};
	  update_exists[ key ] = { $exists : true };

	// check if the field exists in the schema
		model.findOne(update_exists, function (find_err, result){

			if (find_err) return find_err;

			if ( result != null ) {

				console.log('-> '+key+' key already exists in schema');
				res.send(false);

			} else {

			// update nconf
			  var attributes = nconf.get('courseAttributes');
			  attributes.push(key);
			  nconf.save(function(err){});


			  model.find({}, function(err, success){

			// need to find() then iterate through all of them to add the values

			  for (var j in success){

				var keyValues = [req.cookies.user_id, success[j].name, success[j].students, Date.now()];	
				success[j].remove(function(err, success){});

					  for (var i = 0; i < attributes.length; i++){
						keyValues.push(null);
						paths.push( attributes[i] );


						// add the attribute to the schema
						  var path_= attributes[i];
						  var update = {};
						  update[path_] = ''; 
						  courses_model.add( update );

					  }

					// go to create course
					createCourseHandler(model, paths, keyValues);

					// Reset the paths variable for each iteration
					paths = ["user_id","name", "students", "updated_at"];
					
			  } // ends for loop


					console.log('-> '+key+' key added to schema');
					res.send( true );

			  }); // ends model.findOne


			} // ends else

		}); // ends .findOne()

  } catch(e){
	console.log(e);
	res.send(false);
  }

  }; // ends return

}; // ends exports.updateCourse


// routes.create handler
exports.createCourse = function () {

    return function(req, res, next) {

	try{

		var name = req.body.name.toUpperCase();
		model.findOne({name : name}, function (find_err, result){

			if (find_err) return find_err;

			if ( result == null ) {


			  var keyValues = [req.cookies.user_id, name, req.body.students, Date.now()];
			  var attributes = nconf.get('courseAttributes');


			  for (var i = 0; i < attributes.length; i++){
				keyValues.push(null);
				paths.push(attributes[i]);

				// add the attribute to the schema
				  var path_= attributes[i];
				  var update = {};
				  update[path_] = ''; 
				  courses_model.add( update );
			  }

			// subroutine to create the new model within the db
			  createCourseHandler(model, paths, keyValues);

			// Reset the paths variable
			  paths = ["user_id","name", "students", "updated_at"];
			
			// Log and Return to User
			  console.log('-> '+name+' created');
			  res.send( true );

			} else {

				console.log('-> '+name+' already exists');
				res.send( false );

			};

		}); // ends .findOne()


	} catch (e) {
		console.log(e);
		res.send(false);
	}

	}; // ends return

}; // ends createCourse


createCourseHandler = function(model, paths, keyValues){

	var newModel = {};

	for (var i in paths){
  		newModel[paths[i]] = keyValues[i]; 
  	}

	new model(
		newModel

/* 
// new Model takes the following structure (in addition to config 'attributes')

		{
		  user_id    : req.cookies.user_id,
		  name		 : name,
		  students   : req.body.students,//["randcourse1","randcourse2"],
		  updated_at : Date.now()
	  	}

*/
	).save( function ( err, model, next ){

		if( err ) return next( err );


	}); // ends save
}

