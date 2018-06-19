const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
    attempts_on_goal: Number,
    on_target: Number,
    off_target: Number,
    blocked: Number,
    corners: Number,
    offsides: Number,
    ball_possession: Number,
    pass_accuracy: Number,
    num_passes: Number,
    passes_completed: Number,
    distance_covered: Number,
    balls_recovered: Number,
    tackles: Number,
    clearances: Number,
    yellow_cards: Number,
    red_cards: Number,
    fouls_committed: Number,
    country: String
});

const teamSchema = new Schema({
    country: String,
    code: String,
    goals: Number
});

const teamEventSchema = new Schema({
    id: Number,
    type_of_event: String,
    player: String,
    time: String
});

const matchSchema = new Schema({
    location: String,
    status: String,
    time: String,
    fifa_id: String,
    home_team_statistics: statisticsSchema,
    away_team_statistics: statisticsSchema,
    datetime: String,
    last_event_update_at: String,
    last_score_update_at: String,
    home_team: teamSchema,
    away_team: teamSchema,
    winner: String,
    winner_code: String,
    home_team_events: [teamEventSchema],
    away_team_events: [teamEventSchema]
});

module.exports = mongoose.model('match', matchSchema);