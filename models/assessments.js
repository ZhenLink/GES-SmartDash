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
        type: [],
        required: true,
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    
});

module.exports = mongoose.model('completed assessments', assessmentsCompletedSchema);