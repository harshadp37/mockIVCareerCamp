const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('home', {title: 'HOME'})
})

router.use('/employee', require('./employee'));
router.use('/students', require('./student'));
router.use('/interviews', require('./interview'));

module.exports = router;