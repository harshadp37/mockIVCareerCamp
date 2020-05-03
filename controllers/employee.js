const Employee = require('./../models/Employee');
const passport = require('passport');

// SIGN UP TEMPLATE
module.exports.signUp = (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    res.render('sign-up', {title: 'Sign Up'})
}

// SIGN IN TEMPLATE
module.exports.signIn = (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    res.render('sign-in', {title: 'Sign In'})
}

// SIGN OUT
module.exports.signOut = (req, res)=>{
    req.logout();
    res.redirect('/')
}

// REGITER FOR AN EMPLOYEE
module.exports.register = async (req, res)=>{
    try {
        // IF EMPLOYEE IS SIGN IN ALREADY THEN REDIRECT TO HOME
        if(req.isAuthenticated()){
            return res.redirect('/');
        }

        if(!req.body.name || !req.body.email || !req.body.password){
            throw new Error('All Fields Required.');
        }
        
        /* GET EMPLOYEE WITH THE HELP OF EMAIL */
        const employee = await Employee.findOne({email: req.body.email});

        /* IF EMPLOYEE ALREADY EXISTS THEN ABORT OPERATION */
        if(employee){
            console.error("Account Already exists with this Email ID.");
            throw new Error("Account Already exists with this Email ID.")
        }

        // ENCRYPT PASSWORD
        const hash = Employee.encryptPassword(req.body.password);

        Employee.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });

        res.json({success: true, message: "Employee Created Successfully!!"});
    } catch (e) {
        console.log('Error while registering employee');
        res.json({success: false, message: e.message})
    }
}

// LOGIN FOR AN EMPLOYEE
module.exports.login = (req, res, next)=>{
    // IF EMPLOYEE IS SIGN IN ALREADY THEN REDIRECT TO HOME
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    // EMAIL ID AND PASSWORD REQUIRED
    if(!req.body.email || !req.body.password){
        return res.json({success: false, message: 'All Fields(Email & Password) Required.'});
    }

    // AUTHENTICATE EMPLOYEE USING PASSPORT
    passport.authenticate('local', (err, employee, info)=>{
        if(err){
            return res.json({success: false, message: 'Something went wrong.'});
        }
        console.log(employee)
        if(!employee){
            return res.json({success: false, message: info.message});
        }
        // LOGIN EMPLOYEE IF EVERYTHING IS CORRECT
        req.login(employee, (err)=>{
            if(err){
                return res.json({success: false, message: 'Something went wrong'});
            }else{
                return res.json({ success: true, message: "Employee Authenticated!"});
            }
        })
    })(req, res, next);
}