const {Schema, model} = require('mongoose');

const avisSchema = new Schema({
    discordId: String,
    avis: String,
    note: Number,
    messageId: String,
});

module.exports = model('avis', avisSchema);