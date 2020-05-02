const Student = require('./../models/Student');

module.exports.showAllStudents = async (req, res)=>{
    try {
        if(!req.isAuthenticated()){
            res.redirect('/')
        }
        let students = await Student.find({}).sort('batch');

        if(students.length == 0){
            return res.render('student', {title: 'Student', studentFetchingError: 'No Students.'})
        }
        
        return res.render('student', {title: 'Student', students: students})
    } catch (e) {
        console.log('Error while getting All Students.')
        res.render('student', {title: 'Student', studentFetchingError: 'Error while getting all Students.'});
    }
}

module.exports.createStudent = async (req, res)=>{
    try {
        if(!req.isAuthenticated()){
            res.redirect('/')
        }
        if(!req.body.name || !req.body.batch || !req.body.college || !req.body.status || !req.body.DSA || !req.body.WebD || !req.body.React){
            throw new Error('All Fields Required.');
        }
        if(!Student.schema.path('status').enumValues.includes(req.body.status)){
            throw new Error('Status Value is not Valid.')
        }
        let newStudent = await Student.create({
            name: req.body.name,
            batch: req.body.batch,
            college: req.body.college,
            status: req.body.status,
            course: {
                DSA: req.body.DSA,
                WebD: req.body.WebD,
                React: req.body.React
            }
        })

        res.json({success: true, message: 'New Student Added!!', newStudent: newStudent});

    } catch (e) {
        console.log('Error while creating new Student.');
        res.json({success: false, message: e.message});
    }
}