var express = require('express');
var router = express.Router();
var students = require('./students_controller')


router.get('/', students.find);
router.post('/', students.create);

router.post('/attributes', students.add_attribute);
router.delete('/attributes', students.remove_attribute);

router.get('/:uni', students.show);
router.delete('/:uni', students.remove)
router.put('/:uni/add-course', students.add_course);
router.put('/:uni/remove-course', students.remove_course);




module.exports = router;
