'use strict';

var _ = require('lodash');
var required_keys = ['first_name', 'last_name', 'uni'];

exports.find = function(req, res, next) {
	const db = req.app.locals.db;
	var collection = db.collection('Students');
	var params = req.query;
	collection.findAsync(params).then(function(cursor) {
			return cursor.toArrayAsync();
		})
	.then(function(content) {
			res.json(content);
		})
};

exports.create = function(req, res, next) {
	const db = req.app.locals.db;
	var collection = db.collection('Students');
	var params = req.body;
	var param_keys = Object.keys(params);

	// Set error responses for invalid parameters
	

	// Check if any extraneous parameters not in line with schema
	collection.findOneAsync({}).then(function(content) {
		return Object.keys(content)
	}).then(function(schema_keys) {
		var valid = true;
		_(param_keys).forEach(function(key) {
			if (_.indexOf(schema_keys, key) == -1) {
				valid = false;
			}
		});

		if (!valid ||
			_.intersection(param_keys, required_keys).length != required_keys.length) {
			var err = new Error('Request parameters invalid');
			err.status = 400;
			next(err);
		} else {
			collection.insertAsync(params).then(function(status) {
				if (Object.keys(status).length == 1) {
					res.sendStatus(200);
				} else {
					var err = new Error('Server error');
					err.status = 500;
					next(err);
				}
			});
		}
	});
}

exports.show = function(req, res, next) {
	var db = req.app.locals.db;
	var collection = db.collection('Students');
	var uni_param = req.params.uni
	collection.findOneAsync({uni: uni_param})
	.then(function(content) {
			if (content == null) {
				var err = new Error('Specified student not found');
				err.status = 404;
				next(err);
			}
			else {
				console.log("no error");
				res.json(content);
			}
		})
};

exports.
