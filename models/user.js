const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model('users', userSchema);