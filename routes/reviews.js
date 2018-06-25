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

    Match.findOne({ fifa_id: _matchId })
        .then((match) => {
            Review.find({ matchId: _matchId }).populate('userId comments.userId').exec()
                .then((matchReviews) => {
                    res.render('reviews', { title: 'Game Review', match: match, reviews: matchReviews });
                })
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


Router.post('/comments/add', (req, res) => {
    let userId = req.body.userId;
    let postId = req.body.postId;
    let postComment = req.body.postComment;
    Review.findOne({ _id: postId }).then((post) => {
        post.comments = post.comments.concat({ userId: userId, textComment: postComment });

        post.save().populate('comments.userId').exec()
            .then((post) => {
                let lastComment = post.comments.pop();
                res.send(lastComment);
            })
    });
})

Router.delete('/delete/:postId', (req, res) => {
    Review.deleteOne({ _id: req.params.postId })
        .then(() => {
            res.send({ success: true, msg: 'post has been deleted' });
        }).catch((err) => { throw err; })
})
module.exports = Router;