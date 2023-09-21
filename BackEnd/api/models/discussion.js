const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }
});

const discussionSchema = new mongoose.Schema({
    messages: {
        type: [messageSchema],
    }
});

const Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;