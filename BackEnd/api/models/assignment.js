const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    attachment: {
        type: [String],
    },
    dueDate: {
        type: Date,
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educator',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    submission: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Submission'
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
