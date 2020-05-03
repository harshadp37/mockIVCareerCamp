const mongoose = require('mongoose');

// RESULT SCHEMA
const resultSchema = new mongoose.Schema({
    interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    status: {
        type: String,
        enum: ['Pass', 'Fail', 'On Hold', 'Not Attempted'],
        required: true
    }
})

module.exports = mongoose.model('Result', resultSchema);