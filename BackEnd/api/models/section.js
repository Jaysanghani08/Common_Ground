const mongoose = require('mongoose');

// Define the Section schema
const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    attachments:{
        type: [String],

    }
    // You can add more fields specific to the Section here
});

// Create the Section model
const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
