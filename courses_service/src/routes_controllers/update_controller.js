var utils    = require( '../../utils' );

// require the database, which has already been connected
var requireDB = require('../schemas/courses_db.js');
var courses_db = requireDB.getdb;
var courses_model = requireDB.getModel;
 
var model = courses_db.model('courses_model');



var root = '/courses/';

// Redis RI
var redis = require("redis")
clientRI = redis.createClient() // Publishes to ri channel
var pub_channel = "referential_integrity";



// subroutine to build the client's inputted query
buildQuery = function(query, params, iterations){
	var param_keys = Object.keys(params);
	for (var i = 0; i < iterations; i++) {
		query[param_keys[i]] = parseInt(params[param_keys[i]]);
	}
}

// subroutine to post a resource
POSTresource = function (res, collectionQuery, resource, resourceQuery, clientQuery){

  // First use the collection Query to query the db
	model.findOne(collectionQuery, function(err, course_found){

	// If the collection exists, check resource entries to make sure no duplicate exists
		if (course_found) { 
			course_found.collection.aggregate([
				{"$match"	: collectionQuery } // NEED TO PARSE INT() !!!
				,{"$unwind"	: "$"+resource }
				,{"$match"	: resourceQuery } 
			], 
			function (err_lastname, student_found){

			// If the resource already exists
					if ( err_lastname || (student_found.length > 0) ) {

						console.log('-> '+JSON.stringify(resourceQuery)+' was NOT POSTED to '+JSON.stringify(collectionQuery));
						res.send(false);

			// If the resource does not exist, add it to the db
					} else	{		

						course_found[resource].push(clientQuery);					
						course_found.save();
						console.log('-> '+JSON.stringify(clientQuery)+' was POSTED to '+JSON.stringify(collectionQuery));
						res.send(true);

					};
			}); // ends model.findOne

	// If the course does not exist
		} else {

			console.log('-> Query not found : '+JSON.stringify(collectionQuery));
			res.send(false);

		};

	}); // ends model.findOne
}



// subroutine to DELETE a resource
DELETEresource = function (res, collectionQuery, resource, resourceQuery, clientQuery){

  // First use the collection Query to query the db
	model.findOne(collectionQuery, function(err, course_found){

	// If the collection exists, check resource entries to make sure no duplicate exists
		if (course_found) { 
			course_found.collection.aggregate([
				{"$match"	: collectionQuery } // NEED TO PARSE INT() !!!
				,{"$unwind"	: "$"+resource }
				,{"$match"	: resourceQuery } 
			], 
			function (err_lastname, student_found){

			// If the entry already exists
				if (student_found.length > 0 ) {

				// pull (remove) the student from the student collection withing the course 
					model.findOneAndUpdate( collectionQuery, {
						$pull: //{resourceQuery}
							
						{
							students: {	
								uni : clientQuery.uni
							}
						} // ends $pull

					}, function (e, s){
						if (s){
							console.log('-> '+JSON.stringify(resourceQuery)+' DELETED from '+JSON.stringify(collectionQuery));
							res.send(true);
						} else {
							console.log('-> '+JSON.stringify(resourceQuery)+' NOT DELETED from '+JSON.stringify(collectionQuery));
							res.send(false);
						}
					});

			// If the student entry does not exist
				} else	{		

					console.log('-> '+JSON.stringify(resourceQuery)+' does not exist in '+JSON.stringify(collectionQuery));
					res.send(false);

				};


		})// ends aggregate

	// If the course does not exist
		} else {

			console.log('-> Query not found : '+JSON.stringify(collectionQuery));
			res.send(false);

		};

	}); // ends model.findOne
}




exports.removeStudentFromCourse = function( ) {

  return function ( req, res, next ){

  // exported from:
  // 	app.post(  root+'/:course_num/:resource' )

  // Read in the params and client query 	
	var params = req.params;
	var clientQuery = req.query;
	var resource = params.resource;
	var resourceID = params.uni;


  // BUILD THE QUERY FOR THE COLLECTION
  //	Note: the collection identifier (/:collection_id/) == param_keys[0]
	var collectionQuery = {};
	var collection_keys = Object.keys(params);
	collectionQuery[collection_keys[0]] = parseInt(params[collection_keys[0]]);
	//   Note: parseInt() called for the collection query id


  // BUILD THE QUERY for the RESOURCE -- for Mongo's collection.aggregation function
	var resourceQuery = {};

	var query_keys = Object.keys(clientQuery);
	for (var i = 0; i < query_keys.length; i++){
		resourceQuery[resource+"."+query_keys[i]] = clientQuery[query_keys[i]];
	}	

/*
	console.log(params);
	console.log(clientQuery);
	console.log(resource);
	console.log(collectionQuery);
	console.log(resourceQuery);
*/

  // business logic
  	// redis message
		var ri_message = {
			'sender' : 'courses_micro_service',
			'service_action' : 'update student delete course',
			'course_name': params.course_num,
			'uni': params.uni };
		
		var message = JSON.stringify(ri_message).toLowerCase();
		clientRI.publish(pub_channel, message);


	// update db - remove the student from the course
		DELETEresource(res, collectionQuery, resource, resourceQuery, clientQuery);





  } // ends return

} // ends export




exports.addStudentToCourse = function( ) {

  return function ( req, res, next ){

  // exported from:
  // 	app.post(  root+'/:course_num/:resource' )

  // Read in the params and client query 	
	var params = req.params;
	var clientQuery = req.query;
	var resource = params.resource;


  // BUILD THE QUERY FOR THE COLLECTION
  //	Note: the collection identifier (/:collection_id/) == param_keys[0]
	var collectionQuery = {};
	var collection_keys = Object.keys(params);
	collectionQuery[collection_keys[0]] = parseInt(params[collection_keys[0]]);
	//   Note: parseInt() called for the collection query id


  // BUILD THE QUERY for the RESOURCE -- for Mongo's collection.aggregation function
	var resourceQuery = {};
	var query_keys = Object.keys(clientQuery);
	for (var i = 0; i < query_keys.length; i++){
		resourceQuery[resource+"."+query_keys[i]] = clientQuery[query_keys[i]];
	}	

/*
	console.log(params);
	console.log(clientQuery);
	console.log(resource);
	console.log(collectionQuery);
	console.log(resourceQuery);
*/

  // business logic
	if ( (typeof clientQuery.uni === 'undefined') ) {
	    console.log("-> uni is not defined");
		res.send(false);

	} else {

	  var uni = clientQuery.uni;
	  var course_num = parseInt(params.course_num); 

  	// redis message
		var ri_message = {
			'sender' : 'courses_micro_service',
			'service_action' : 'update student add course',
			'course_name': course_num,
			'uni': uni };
		
		var message = JSON.stringify(ri_message).toLowerCase();
		clientRI.publish(pub_channel, message);

	// update db - post the student to the course
		POSTresource(res, collectionQuery, resource, resourceQuery, clientQuery);

	} // ends else

  } // ends return

} // ends export



PUTdocument = function (res, collectionQuery, clientQuery){
	model.findOneAndUpdate( collectionQuery, {
		$set: clientQuery//req.body[key]
	}, function (e, s){
		if (s){

			console.log('-> '+JSON.stringify(clientQuery)+' PUT to '+JSON.stringify(collectionQuery));
			res.send(true);

		} else {
		
			console.log('-> '+JSON.stringify(clientQuery)+' NOT PUT to '+JSON.stringify(collectionQuery));
			res.send(false);

		}
	});
}


exports.updateCourse = function( ) {

  return function ( req, res, next ){


  // exported from:
  // 	app.post(  root+'/:course_num/:resource' )

  // Read in the params and client query 	
	var params = req.params;
	var clientQuery = req.query;


  // BUILD THE QUERY FOR THE COLLECTION
  //	Note: the collection identifier (/:collection_id/) == param_keys[0]
	var collectionQuery = {};
	var collection_keys = Object.keys(params);
	collectionQuery[collection_keys[0]] = parseInt(params[collection_keys[0]]);
	//   Note: parseInt() called for the collection query id

/*
	console.log(params);
	console.log(clientQuery);
	console.log(collectionQuery);
*/


// business logic
	if ( (clientQuery.name == null) && (clientQuery.students == null) ) {

	// update db - post the student to the course
		PUTdocument(res, collectionQuery, clientQuery);

	} else {

	    console.log("-> restricted key");
		res.send(false);

	}


  }; // ends return

}; // ends exports.updateCourse



