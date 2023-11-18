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
    courseCode: {
        type: String,
        unique: true,
        required: true,
        match: /^[a-zA-Z]+[0-9]+$/,
    },
    courseLevel: {
        type: String, // You can specify 'beginner', 'intermediate', 'advanced', etc.
        required: true,
        trim: true
    },
    coursePrice: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        required: true
    },
    language : {
        type : String,
        required : true,
    },
    prerequisites: {
        type: [String],
    },
    courseSections: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Section',
    },
    courseAssignments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Assignment',
    },
    visibility: {
        type: String,
        default: 'public',
    },
    enrolledStudents: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Student',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Educator',
    },
    courseFeedback: {
        type: [feedback],
    },
    rating: {
        type: Number,
        default: 0,
    },
    discussionForum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
    },
    thumbnail: {
        type: String
    },
    courseCertificate: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Course', courseSchema);
