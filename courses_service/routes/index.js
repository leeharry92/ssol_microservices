var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/courselist', function(req, res) {
    var db = req.db;
    var collection = db.get('Courses');
    collection.find({},{},function(e,docs){
        res.render('courselist', {
            "courselist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newcourse', function(req, res) {
    res.render('newcourse', { title: 'Add New Course' });
});

/* POST to Add User Service */
router.post('/addcourse', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var subject = req.body.subject;
    var location = req.body.location;

    // Set our collection
    var collection = db.get('Courses');

    // Submit to the DB
    collection.insert({
        "subject" : subject,
        "location" : location
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("courselist");
        }
    });
});

module.exports = router;
