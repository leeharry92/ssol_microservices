/*

var utils    = require( '../../utils' );

// require the database, which has already been connected
var requireDB = require('../schemas/courses_db.js');
var courses_db = requireDB.getdb;
var courses_model = requireDB.getModel;
 
var model = courses_db.model('courses_model');


var root = '/courses/';


exports.addKeytoSchema = function( ) {

  return function ( req, res, next ){

	console.log("SCHEMA");

  try {


	  var key= req.body.key;
	  var path = key;
	  var update = {};
	  update[path] = ''; 


	  model.update( {}, 
			{$set : {name : update}},
			{upsert:false,
			multi:true} ); 



	  console.log('-> '+key+' key added to courses schema');
	  res.send(true);


  } catch(e) {
	console.log(e);
	res.send(false);
  }

  }; // ends return

}; // ends exports.updateCourse

*/

