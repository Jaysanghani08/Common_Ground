const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    profilePic: {
        type: String,
    },
    interests: {
        type: [String],
    },
    bookmarkedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;