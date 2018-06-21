const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const standingSchema = new Schema({
    id: Number,
    country: String,
    alternate_name: String,
    fifa_code: String,
    group_id: Number,
    group_letter: String,
    wins: Number,
    draws: Number,
    losses: Number,
    games_played: Number,
    points: Number,
    goals_for: Number,
    goals_against: Number,
    goal_differential: Number
});

module.exports = mongoose.model('standing', standingSchema);