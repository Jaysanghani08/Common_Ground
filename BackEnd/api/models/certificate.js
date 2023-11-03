const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Educator',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;