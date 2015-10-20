'use strict';

exports.index = function(req, res, next) {
	const db = req.app.locals.db;
	var collection = db.collection('Students');
	collection.findAsync({}).then(function(cursor) {
			return cursor.toArrayAsync();
		})
	.then(function(content) {
			res.json(content);
		})
};

exports.show = function(req, res, next) {
	var db = req.app.locals.db;
	var collection = db.collection('Students');
	var uni_param = req.params.uni
	collection.findOneAsync({uni: uni_param})
	.then(function(content) {
			if (content == null) {
				console.log("error");
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