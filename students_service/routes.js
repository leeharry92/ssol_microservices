var express = require('express');
var router = express.Router();
var students = require('./students_controller')


router.get('/', students.find);
router.post('/', students.create);

router.get('/:uni', students.show);


module.exports = router;
