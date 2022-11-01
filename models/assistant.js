const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: true,
    },
    userMessage: {
        type: String,
        required: true,
    },
    assistantMessage: {
        type: String,
        required: true,
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model('assistant', assistantSchema);