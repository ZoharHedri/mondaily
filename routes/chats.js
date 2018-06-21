const express = require('express');
const Router = express.Router();
const Chat = require('../model/chatModel');

Router.get('/', (req, res) => {
    res.render('chats/chat');
});

module.exports = Router;