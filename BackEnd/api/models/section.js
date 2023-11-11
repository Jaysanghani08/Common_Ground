const mongoose = require('mongoose');

const post = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    },
    attachments: {
        type: [String],
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    }
});

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    posts: {
        type: [post],
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    }
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
