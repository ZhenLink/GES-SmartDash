const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    Project_Number: {
        type: String,
        required: true,
    },

    payment_Reference: {
        type: String,
        required: true,
        unique:  true,
    },
    Currency: {
        type: String,
        required: true,
    },
    Customer_Name: {
        type: String,
        required: true,
    },
    Customer_Email: {
        type: String,
        required: true,
    },
    Amount: {
        type: String,
        required: true,
    },
    Payment_Date: {
        type: Date,
        required: true,
        default: Date.now()
    },
});

module.exports = mongoose.model('payments', paymentSchema);