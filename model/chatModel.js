
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cahtSchema = new Schema({
    match_id: String,
    user_name: String,
    text: String
});

module.exports = mongoose.model('chat', cahtSchema);