const {Schema, model} = require('mongoose');

const schema = new Schema({
    discordId: {
        type: String,
        required: true,
    },
    joinAt: {
        type: Date,
        default: Date.now,
    },
    birthday: {
        type: Date,
    },
    partenary: {
        type: Boolean,
        default: false,
    }
})
module.exports = model('discordProfil', schema);