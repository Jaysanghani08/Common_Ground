const mongoose = require('mongoose');

// Define the Assignment schema
const assignmentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,

    },
    dueDate: {
        type: Date,
        required: true,
    },

    dateCreated: {
        type: Date,
        default: Date.now()
    },

    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educator',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to the Course model
        required: true,
    },
    attachment: {
        type: [String],

    }


    // You can add more fields specific to assignments here, such as submission details or attachments
});

// Create the Assignment model
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
