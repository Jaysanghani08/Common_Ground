const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
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
    upiID: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    courseCreated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
});

const Educator = mongoose.model('Educator', educatorSchema);

module.exports = Educator;
