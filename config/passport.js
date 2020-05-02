const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Employee = require('./../models/Employee')

passport.use(new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done){
        // GET EMPLOYEE USING EMAIL
        Employee.findOne({ email: email }, function (err, employee) {
            if (err) {
                return done(err);
            }
            if (!employee) {
                return done(null, false, { message: 'Wrong Credentials.' });
            }
            if (!employee.validPassword(password)) {
                return done(null, false, { message: 'Wrong Credentials.' });
            }
            return done(null, employee);
        })
    }
))

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    Employee.findById(id, function (err, employee) {
        done(err, employee);
    });
})

// SET USER IN LOCALS
passport.setEmployee = (req, res, next)=>{
    if(req.isAuthenticated()){
        let employee = {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
        res.locals.employee = employee;
    }
    next();
}

module.exports = passport;