const mongoose = require('mongoose');

const energyreadingsSchema = new mongoose.Schema({
    
    Timestamp: {
        type: Date,
        required: true,
        default: Date.now()
    },
    Watts: {
        type: double,
        required: true,
    },
    
});

module.exports = mongoose.model('energy readings', energyreadingsSchema);