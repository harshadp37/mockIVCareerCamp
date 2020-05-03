const express = require('express');
const router = express.Router();
const interviewController = require('./../controllers/interview');

// GET ALL INTERVIEW DETAILS
router.get('/', interviewController.getAllInterviews);

// GET STUDNETS FOR AN INTERVIEW
router.get('/:id/students', interviewController.getAllocatedStudents);
router.get('/:id/studentsToAdd', interviewController.getRemainingStudents);

// ADD NEW INTERVIEW AND STUDENT TO INTERVIEW
router.post('/add', interviewController.addNewInterview);
router.put('/addStudent', interviewController.addStudentForAnInterview);

module.exports = router;