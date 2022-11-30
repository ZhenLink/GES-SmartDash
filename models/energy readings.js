const mongoose = require('mongoose');

const energyreadingsSchema = new mongoose.Schema({
    
    Timestamp: {
        type: Date,
        required: true,
        default: Date.now()
    },
    DeviceID: {
        type: String,
        required: true,
    },
    Watts: {
        type: [],
        required: true,
    },
    
});

module.exports = mongoose.model('energy readings', energyreadingsSchema);