const mongoose = require('mongoose');

const feedback = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true,
        trim: true,
        Number: false
    },
    courseDescription: {
        type: String,
        max: 50,
        required: true
    },
    courseDescriptionLong: {
        type: String,
        min: 50,
        required: true
    },
    coursePrice: {
        type: Number,
        default: 0,
    },
    thumbnail: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    courseLevel: {
        type: String, // You can specify 'beginner', 'intermediate', 'advanced', etc.
        required: true,
        trim: true
    },
    courseCode: {
        type: String,
        unique: true,
        required: true,
        match: /^[a-zA-Z]+[0-9]+$/,
    },
    dateCreated: {
        type: Date,   //don't take any input
        default: Date.now,
    },
    language : {
        type : String,
        required : true,
    },
    courseSections: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Section',
    },
    courseAssignments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Assignment',
    },
    prerequisites: {
        type: [String],
    },
    visibility: {
        type: String,
        default: 'public',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Educator',
    },
    enrolledStudents: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Student',
    },
    courseFeedback: {
        type: [feedback],
    },
    discussionForum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
    },
    courseCertificate: {
        type: String,
    },
});

module.exports = mongoose.model('Course', courseSchema);
