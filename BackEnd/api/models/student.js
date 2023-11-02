const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim:true
    },
    gender: {
        type: String,
        required: true,
        trim:true
    },
    location: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true

    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    profilePic: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    },
    interests: {
        type: [String],
        trim: true
    },
    bookmarkedCourses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Course'
    },
    enrolledCourses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course'
    },
    certificates: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Certificate'
    },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;