var express = require('express');
var myRouter = express.Router();
var router = require('./controllers/router');

//console.log('Inside students routes');
myRouter.get('/:uni', router.findStudent);
myRouter.get('/', router.findStudent);

myRouter.post('/', router.createStudent);
myRouter.post('/attributes', router.createStudent);

myRouter.delete('/attributes', router.deleteAttribute);
myRouter.delete('/:uni', router.deleteStudent);


myRouter.put('/:uni', router.updateStudent);
myRouter.put('/:uni/add-course', router.updateStudent);
//Students-microservice check crash
myRouter.put('/:uni/remove-course', router.updateStudent);

module.exports = myRouter;