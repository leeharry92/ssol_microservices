var express = require('express');
var router = express.Router();
var students = require('./students_controller')


router.get('/', students.index);
router.get('/:uni', students.show);
router.post('');

module.exports = router;
