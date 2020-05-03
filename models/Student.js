const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// STUDENT SCHEMA
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['Placed', 'Not placed'],
        required: true,
    },
    course: {
        DSA: {
            type: Number,
            required: true
        },
        WebD: {
            type: Number,
            required: true
        },
        React: {
            type: Number,
            required: true
        }
    },
    interviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
    }],
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result',
    }],
})

module.exports = mongoose.model('Student', studentSchema);