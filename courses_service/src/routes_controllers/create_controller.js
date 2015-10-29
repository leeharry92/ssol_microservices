var utils    = require( '../../utils' );

// require the database, which has already been connected
var requireDB = require('../schemas/courses_db.js');
var courses_db = requireDB.getdb;
var courses_model = requireDB.getModel;
 
var model = courses_db.model('courses_model');


var root = '/courses/';


	  var key= "new_field";
	  var path = key;
	  var update = {};
	  update[path] = ''; 

	  courses_model.add( update );

	  model.update( {}, 
			{$set : {"new_field":1}},
			{upsert:false,
			multi:true} ); 



// routes.create handler
exports.createCourse = function () {

    return function(req, res, next) {

	try{

		var name = req.body.name.toUpperCase();
		model.findOne({name : name}, function (find_err, result){

			if (find_err) return find_err;

			if ( result == null ) {

				  new model({
					  user_id    : req.cookies.user_id,
					  name		 : name,
					  students   : req.body.students,//["randcourse1","randcourse2"],
					  updated_at : Date.now()
					  //,new_field  : 10,
				  }).save( function ( err, model, next ){

						if( err ) return next( err );

						console.log('-> '+name+' created');

						res.send( true );

				  }); // ends save

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


