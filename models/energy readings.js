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
        type: Number,
        required: true,
    },
    
});

module.exports = mongoose.model('energy readings', energyreadingsSchema);