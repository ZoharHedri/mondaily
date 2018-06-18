const express = require('express');
const Router = express.Router();
const Review = require('../model/reviewsModel');
const Match = require();

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

Router.get('/match/:match_id', (req, res) => {

})

Router.get('/match/getMatch', (req, res) => {

})

Router.get('/', (req, res) => {
    res.render('reviews');
});

module.exports = Router;