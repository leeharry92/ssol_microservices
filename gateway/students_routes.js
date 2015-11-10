var express = require('express');
var myRouter = express.Router();
var router = require('./controllers/router');


myRouter.get('/:uni', router.findStudent);
myRouter.get('/', router.findStudentAll);


myRouter.post('/', router.createStudent);


myRouter.post('/attributes', router.createStudentAll);
myRouter.delete('/attributes', router.deleteAttribute);


myRouter.delete('/:uni', router.deleteStudent);


myRouter.put('/:uni', router.updateStudent);
myRouter.put('/:uni/add-course', router.updateStudent);
myRouter.put('/:uni/remove-course', router.updateStudent);

module.exports = myRouter;