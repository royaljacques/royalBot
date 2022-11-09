const {Schema, model} = require('mongoose');
const banSchema = new Schema({
    discordId: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});
module.exports = model('ban', banSchema);