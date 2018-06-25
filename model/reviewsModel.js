const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    textComment: String,
    created_at: { type: Date, default: Date.now }
})

const reviewSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    reviewText: String,
    matchId: String,
    comments: [commentSchema],
    created_at: { type: Date, default: Date.now }
})

var Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;
