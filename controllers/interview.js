const Interview = require('./../models/Interview');
const Student = require('./../models/Student');

module.exports.getAllInterviews = async (req, res)=>{
    try {
        if(!req.isAuthenticated()){
            res.redirect('/')
        }
        let interviews = await Interview.find({});

        if(interviews.length == 0){
            return res.render('interview', {title: 'Interview', interviewFetchingError: 'No Interviews.'})
        }
        
        let upcomingInterviews = [];
        let pastInterviews = [];

        interviews.forEach(interview => {
            if(interview.date >= new Date()){
                upcomingInterviews.push(interview);
            }else{
                pastInterviews.push(interview);
            }
        });

        upcomingInterviews.sort(compare);
        pastInterviews.sort(compare);

        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            let comparison = 0;
            if (a.date > b.date) {
              comparison = 1;
            } else if (a.date < b.date) {
              comparison = -1;
            }
            return comparison;
          }

        return res.render('interview', {title: 'Interview', upcomingInterviews: upcomingInterviews, pastInterviews: pastInterviews})
    } catch (e) {
        console.log('Error while getting All Interviews.')
        res.render('interview', {title: 'Interview', interviewFetchingError: 'Error while getting all Interviews.'});
    }
}

module.exports.addNewInterview = async (req, res)=>{
    try {
        if(!req.isAuthenticated()){
            res.redirect('/')
        }
        if(!req.body.company || !req.body.date){
            throw new Error('All Fields Required.');
        }

        let interviewDate = new Date(req.body.date);
        interviewDate.setHours(23);
        interviewDate.setMinutes(59);
        interviewDate.setSeconds(59);

        let newInterview = await Interview.create({
            company: req.body.company,
            date: interviewDate,
        })

        res.json({success: true, message: 'New Interview Added!!', newInterview: newInterview});

    } catch (e) {
        console.log('Error while creating new Interview.');
        res.json({success: false, message: e.message});
    }
}

module.exports.getAllocatedStudents = async (req, res)=>{
    try {
        if(!req.isAuthenticated()){
            res.redirect('/')
        }
        let students = await Student.find({}).sort('batch');

        if(students.length == 0){
            return res.json({success: false, message: 'No Students.'})
        }
        
        return res.json({success: true, students: students});
    } catch (e) {
        console.log('Error while getting All Students.')
        res.json({success: false, message: 'Error while getting all Students.'});
    }
}

module.exports.getRemainingStudents = async (req, res)=>{
    try {
        if(!req.isAuthenticated()){
            res.redirect('/')
        }
        let interview = await Interview.findById(req.params.id);

        if(!interview){
            return res.json({success: false, message: 'Something went wrong.'})
        }

        let students = await Student.find({_id: {$nin: interview.students}}).sort('batch');

        if(students.length == 0){
            return res.json({success: false, message: 'No Students found to add.'})
        }
        
        return res.json({success: true, students: students});
    } catch (e) {
        console.log('Error while getting All Students.')
        res.json({success: false, message: 'Error while getting all Students.'});
    }
}

module.exports.addStudentForAnInterview = async (req, res)=>{
    try {
        if(!req.body.interviewID || !req.body.studentID){
            throw new Error('Something went wrong.')
        }
        let interview = await Interview.findById(req.body.interviewID);
        if(!interview){
            throw new Error('Something went wrong.')
        }

        let student = await Student.findById(req.body.studentID);
        if(!student){
            throw new Error('Something went wrong.')
        }
        
        interview.students.push(student);
        await interview.save();

        student.interviews.push(interview);
        await student.save();
        
        res.json({success: true});
    } catch (e) {
        console.log('Error while allocating Student. ' + e)
        res.json({success: false, message: 'Error while allocating Student.'});
    }
}