const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    id: String,
    date: Date,
    time: String,
    round: String,
    home_name: String,
    away_name: String,
    location: String,
    league_id: String,
    home_id: String,
    away_id: String,
    score: String,
    id_live: String,
    status: String,
    last_changed: Date,
    events: Boolean,
    league_name: String
});

module.exports = mongoose.model('match', matchSchema);