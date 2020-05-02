const express = require('express');
const router = express.Router();
const studentController = require('./../controllers/student');

// GET ALL STUDENT DETAILS
router.get('/', studentController.showAllStudents);

// ADD NEW STUDENT
router.post('/add', studentController.createStudent);

module.exports = router;