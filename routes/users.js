
const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.send("hello");
});

Router.get('/login', (req, res) => {
    res.render('users/login');

});

Router.get('/register', (req, res) => {
    res.render('users/register');
});


Router.post('/register', (req, res) => {

    //console.log(req.body.userName + ' ' + req.body.usereEmail + ' ' + req.body.userPasswor) good
    //save to DB
    // var userModel = mongoose.model('user', userSchema);
    // userModel.create({
    //     user_name: req.body.userName,
    //     user_email: usereEmail,
    //     password: userPasswor
    // }, function (err, data) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //     console.log(data);
    // });


    res.render('users/login'); //views
});


Router.post('/login', (req, res) => {

    // store, a JS object as JSON string, in local storage under the key "user"
    // var saveToLocalStorage = function () {
    //     localStorage.setItem('user', JSON.stringify({id: ""}));
    // }

    // saveToLocalStorage();

});






module.exports = Router;