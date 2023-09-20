const mongoose = require('mongoose');

const discussionForum = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Discussion = mongoose.model('Discussion', discussionForum);

module.exports = Discussion;