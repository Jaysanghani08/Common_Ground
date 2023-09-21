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
    createdByStudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },

    createdByEducator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Educator'
    }

});

const discussionSchema = new mongoose.Schema({
    messages: {
        type: [messageSchema],
    }
});

const Discussion = mongoose.model('Discussion', discussionSchema);
module.exports = Discussion;