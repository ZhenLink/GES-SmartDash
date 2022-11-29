const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    
    Question: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model('assessment', assessmentSchema);