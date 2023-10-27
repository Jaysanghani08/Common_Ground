const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    submission: {
        type: [String],
    },
    grade: {
        type: Number,
        default: 0
    },
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Educator'
    },
    dateSubmitted: {
        type: Date,
        value: Date.now()
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;