const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    description: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // username: { type: String, required: true },
    // duration: { type: Number, required: true },
    // date: { type: Date, required: false },

}, {
        timestamps: true,
    });

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;