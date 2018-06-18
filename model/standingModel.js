
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    league_id: String,
    season_id: Number,
    name: String,
    rank: Number,
    points: Number,
    matches: Number,
    goal_diff: Number,
    goals_scored: Number,
    goals_conceded: Number,
    lost: Number,
    drawn: Number,
    won: Number
});

const standingSchema = new Schema({
    league_id: String,
    teams: [teamSchema]
});

module.exports = mongoose.model('standing', standingSchema);