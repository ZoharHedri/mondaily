const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const app = express();

mongoose.connect(process.env.CONNECTION_STRING, () => {
    console.log('connected to mondaily-db');
});

//routes
const usersRoute = require('./routes/users');
const chatsRoute = require('./routes/chats');
const reviewsRoute = require('./routes/reviews');
const matchesRoute = require('./routes/matches');
const standingRoute = require('./routes/standing');

//static middileware
app.use(express.static('public'));
app.use(express.static('node_modules'));

//express handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    handlebars: handlebars,
    helpers: require('./public/js/helper.js')
}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', usersRoute);
app.use('/chats', chatsRoute);
app.use('/reviews', reviewsRoute);
app.use('/matches', matchesRoute);
app.use('/standing', standingRoute);


app.get('/', (req, res) => {
    let data = {
        title: 'Mondaily 2018'
    };
    res.render('index', data);
});

const port = process.env.PORT || 8000;
app.listen(port, () => { console.log('server listening on port', port) });