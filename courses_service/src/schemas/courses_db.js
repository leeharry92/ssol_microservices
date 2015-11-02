
var loadconfig = require('../../config/loadconfig.js');
var defaultOptions = loadconfig.DEFAULTS;


var mongoServer = 'mongodb://'+defaultOptions.host;
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;


	var students_model = new Schema({
		  lastname : String,
		  firstname: String
	});

//module.exports = function() {
	var courses_model = new Schema;

	courses_model.add({
		user_id    : String,
		name	   : String,
		students   : [students_model],
		updated_at : Date
	});


	mongoose.model( 'courses_model', courses_model ); // model


	var courses_db = mongoose.createConnection(mongoServer);
	courses_db.on('error', function(err){
	  if(err) throw err;
	});

	courses_db.once('open', function callback () {
	  console.info('Mongo db connected successfully on: '+mongoServer);
	});


	exports.getModel = courses_model;
	exports.getdb = courses_db;
//};


