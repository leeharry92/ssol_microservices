var express = require('express');
var myRouter = express.Router();
var router = require('./controllers/router');

//app.get('/students/:id', router.getStudent);
//console.log('Inside courses routes');
myRouter.get('/', router.findCourse);

myRouter.post('/', router.createCourse);

module.exports = myRouter;
