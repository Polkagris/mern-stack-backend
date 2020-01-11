const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        max: 255
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
        max: 1024
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
}, {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);

module.exports = User;