const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
        unique: true,
    },
    clubNum: {
        type: Number,
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;