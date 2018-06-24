const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    textComment: String
})

const reviewSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    reviewText: String,
    matchId: String,
    comment: [commentSchema]
})

var Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;
