const express = require('express');
const Router = express.Router();
const Review = require('../model/reviewsModel');
const Match = require('../model/matchModel');

Router.post('/add/:userId', (req, res) => {
    _userId = req.params.userId;
    _reviewText = req.body.text;
    _matchId = req.body.matchId;

    let newReview = new Review({
        userId: _userId,
        reviewText: _reviewText,
        matchId: _matchId
    })

    newReview.save()
        .then((review) => {
            res.render('reviews');
        })
        .catch((err) => {
            res.send(err);
        })
})

Router.get('/displayReviews/:matchId', (req, res) => {
    let _matchId = req.params.matchId;

    Review.find({ matchid: _matchId })
        .then((matchReviews) => {
            Match.find({ matchid: _matchId })
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
    Review.find({ matchId: '200' })
        .then((reviews) => {
            console.log(reviews);
            res.render('reviews', { reviews: reviews });
        })
        .catch((err) => { throw err; })

});

module.exports = Router;