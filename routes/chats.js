const express = require('express');
const Router = express.Router();
const Chat = require('../model/chatModel');

Router.get('/', (req, res) => {
    res.render('chats/chat');
});


Router.post('/addChat', (req, res) => {
    //console.log(req.body.matchid + ' ' + req.body.username + ' ' + req.body.text); good

    Chat.create({
        // match_id: req.body.matchid,
        match_id: req.body.matchid,
        user_name: req.body.username,
        text: req.body.text
    }, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log('saved chat');
        res.end();
    });


});


Router.get('/getChat/:match_id', (req, res) => {
    Chat.find({ match_id: req.params.match_id })
        .then((chats) => {
            res.send(chats);
        })
        .catch((err) => { throw err; })
});
module.exports = Router;