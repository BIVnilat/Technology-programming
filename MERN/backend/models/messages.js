const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Message = new Schema({
    value: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('messages', Message);