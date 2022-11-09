const {Schema, model} = require('mongoose');
const schema = new Schema({
    discordId: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 0,
    },
    xpMax: {
        type: Number,
        default: 100,
    }

});
module.exports = model('discordLevels', schema);