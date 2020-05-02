const mongoose = require('mongoose');

// EMPLOYEE SCHEMA
const interviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
})

module.exports = mongoose.model('Student', interviewSchema);