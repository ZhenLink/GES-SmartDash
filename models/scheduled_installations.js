const mongoose = require('mongoose');

const scheduledInstallationSchema = new mongoose.Schema({
    
    Customer: {
        type: String,
        required: true,
    },
    ProjectID: {
        type: String,
        required: true,
    },
    Contact: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },

    Message: {
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model('Scheduled Installations', scheduledInstallationSchema);