const express = require('express');
const router = express.Router();
const interviewController = require('./../controllers/interview');

// GET ALL INTERVIEW DETAILS
router.get('/', interviewController.getAllInterviews);
router.get('/:id/students', interviewController.getAllocatedStudents);
router.get('/:id/studentsToAdd', interviewController.getRemainingStudents);

// ADD NEW INTERVIEW
router.post('/add', interviewController.addNewInterview);
router.put('/addStudent', interviewController.addStudentForAnInterview);

module.exports = router;