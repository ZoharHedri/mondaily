const express = require('express');
const Router = express.Router();
const Review = require('../model/reviewsModel');
const Match = require('../model/matchModel');

Router.post('/add/', (req, res) => {
    _userId = req.body.userId;
    _reviewText = req.body.reviewText;
    _matchId = req.body.matchId;

    let newReview = new Review({
        userId: _userId,
        reviewText: _reviewText,
        matchId: _matchId
    })

    newReview.save()
        .then((review) => {
            res.json(review);
        })
        .catch((err) => {
            res.send(err);
        })
})

Router.get('/displayReviews/:matchId', (req, res) => {
    let _matchId = req.params.matchId;

    // Review.find({ fifa_id: _matchId })
    //     .then((matchReviews) => {
    //         Match.find({ matchid: _matchId })
    // })

    Match.findOne({ fifa_id: _matchId })
        .then((match) => {
            res.render('reviews', { match: match })
        })
})

/* Review.create({ user: '', reviewText: 'argentina campeone', matchId: '200' })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        throw err;
    }) */

Router.get('/', (req, res) => {

    Review.find({ matchId: '300331526' }).populate('userId').exec()
        .then((reviews) => {
            console.log(reviews);
            res.render('_postTemplate', { reviews: reviews });
        })
        .catch((err) => { throw err; })
});

Router.get('/match/:matchId', (req, res) => {
    Review.find({ matchId: req.params.matchId }).populate('userId').exec()
        .then((reviews) => {
            res.send(reviews);
        })
})

module.exports = Router;