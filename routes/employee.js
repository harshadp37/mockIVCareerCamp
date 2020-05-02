const express = require('express');
const router = express.Router();
const employeeController = require('./../controllers/employee');

// SEND SIGN UP AND SIGN UP TEMPLATES
router.get('/sign-up', employeeController.signUp);
router.get('/sign-in', employeeController.signIn);
router.get('/sign-out', employeeController.signOut);

// SIGN UP AND SIGN IN GOR EMPLOYEE
router.post('/sign-up', employeeController.register);
router.post('/sign-in', employeeController.login);

module.exports = router;