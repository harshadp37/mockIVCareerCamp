const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// EMPLOYEE SCHEMA
const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// CREATE HASH FOR THE PASSWORD
employeeSchema.statics.encryptPassword = function(password){
    return bcrypt.hashSync(password, 10);
}

// CHECK PASSWORD WITH DATABASE HASH WHILE SIGNING IN
employeeSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Employee', employeeSchema);