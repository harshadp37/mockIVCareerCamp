const express = require('express');
const router = express.Router();

// HOME ROUTE
router.get('/', (req, res)=>{
    res.render('home', {title: 'HOME'})
})

// EMPLOYEE ROUTE
router.use('/employee', require('./employee'));

// STUDENTS ROUTE
router.use('/students', require('./student'));

// INTERVIEWS ROUTE
router.use('/interviews', require('./interview'));

// RESULTS ROUTE
router.use('/results', require('./result'));

// DOWNLOAD ROUTE
router.use('/download', require('./download'));

module.exports = router;