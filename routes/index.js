const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    console.log(req.isAuthenticated())
    res.render('home', {title: 'HOME'})
})

router.use('/employee', require('./employee'));

module.exports = router;