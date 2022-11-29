const mongoose = require('mongoose');

const assessmentsCompletedSchema = new mongoose.Schema({
    
    Assessment: {
        type: [],
        required: true,
    },
    User: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
        default: Date.now()
    },
    
});

module.exports = mongoose.model('completed assessments', assessmentsCompletedSchema);