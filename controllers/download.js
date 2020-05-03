const Interview = require('./../models/Interview');
const Student = require('./../models/Student');
const Result = require('../models/Result');

module.exports.getDownloadPage = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('download', { title: 'Download' });
}

module.exports.getData = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/')
        }
        let students = await Student.find({}).populate({path: 'interviews'}).populate({path: 'results'})
        console.log(students)
        res.json({success: true, students: students});
    } catch (e) {
        console.log('Error while Downloading data' + e);
        return res.json({success: false, message: 'Something went wrong...Please try again.'})
    }
}