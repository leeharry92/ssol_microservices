var express = require('express');
var router = express.Router();
var students = require('./controller')


router.get('/', students.index);

module.exports = router;
