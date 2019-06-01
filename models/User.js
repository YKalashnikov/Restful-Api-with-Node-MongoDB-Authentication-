const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: true,
        max: 19,
        min: 4
    },
    email: {
        type: String,
        required: true,
        min: 4,
        max:20
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema );