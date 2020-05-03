const Interview = require('./../models/Interview');
const Student = require('./../models/Student');
const Result = require('../models/Result');

module.exports.addResultStatus = async (req, res)=>{
    try {
        if(!req.body.interviewID || !req.body.studentID || !req.body.resultStatus){
            throw new Error('Please select status of a result.')
        }

        if(!Result.schema.path('status').enumValues.includes(req.body.resultStatus)){
            throw new Error('Result Status Value is not Valid.')
        }
        let student = await Student.findById(req.body.studentID);
        
        if(!student){
            throw new Error('Something went wrong.')
        }

        let newResult = await Result.create({
            interview: req.body.interviewID,
            student: req.body.studentID,
            status: req.body.resultStatus
        })

        student.results.push(newResult);
        student.save();

        return res.json({success: true, newResult: newResult})
    } catch (e) {
        console.log('Error while adding Result Status. ' + e);
        res.json({success: false, message: e.message})
    }
}

module.exports.updateResultStatus = async (req, res)=>{
    try {
        if(!req.body.resultID || !req.body.resultStatus){
            throw new Error('Something went wrong.')
        }

        if(!Result.schema.path('status').enumValues.includes(req.body.resultStatus)){
            throw new Error('Result Status Value is not Valid.')
        }

        let result = await Result.findById(req.body.resultID);

        if(!result){
            throw new Error('Something went wrong.')
        }

        result.status = req.body.resultStatus;
        await result.save();

        res.json({success: true})
    } catch (e) {
        console.log('Error while updating Result Status.');
        res.json({success: false, message: e.message})
    }
}