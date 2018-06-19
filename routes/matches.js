const express = require('express');
const fetch = require('node-fetch');
const Router = express.Router();
const Match = require('../model/matchModel');

let getMachesFromApi = function () {
    let group_a = fetch('http://livescore-api.com/api-client/fixtures/matches.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=793').then((result) => result.json());
    let group_b = fetch('http://livescore-api.com/api-client/fixtures/matches.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=794').then((result) => result.json());;
    let group_c = fetch('http://livescore-api.com/api-client/fixtures/matches.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=795').then((result) => result.json());;
    let group_d = fetch('http://livescore-api.com/api-client/fixtures/matches.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=796').then((result) => result.json());;
    let group_e = fetch('http://livescore-api.com/api-client/fixtures/matches.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=797').then((result) => result.json());;
    let group_f = fetch('http://livescore-api.com/api-client/fixtures/matches.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=798').then((result) => result.json());;
    let group_g = fetch('http://livescore-api.com/api-client/fixtures/matches.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=799').then((result) => result.json());;
    let group_h = fetch('http://livescore-api.com/api-client/fixtures/matches.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=800').then((result) => result.json());;

    let group_a_hi = fetch('http://livescore-api.com/api-client/scores/history.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=793').then((result) => result.json());;
    let group_b_hi = fetch('http://livescore-api.com/api-client/scores/history.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=794').then((result) => result.json());;
    let group_c_hi = fetch('http://livescore-api.com/api-client/scores/history.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=795').then((result) => result.json());;
    let group_d_hi = fetch('http://livescore-api.com/api-client/scores/history.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=796').then((result) => result.json());;
    let group_e_hi = fetch('http://livescore-api.com/api-client/scores/history.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=797').then((result) => result.json());;
    let group_f_hi = fetch('http://livescore-api.com/api-client/scores/history.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=798').then((result) => result.json());;
    let group_g_hi = fetch('http://livescore-api.com/api-client/scores/history.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=799').then((result) => result.json());;
    let group_h_hi = fetch('http://livescore-api.com/api-client/scores/history.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=800').then((result) => result.json());;


    let matches = [];
    return Promise.all([group_a, group_b, group_c, group_d, group_e, group_f, group_g, group_h, group_a_hi, group_b_hi, group_c_hi, group_d_hi, group_e_hi, group_f_hi, group_g_hi, group_h_hi])
        .then((values) => {
            values.forEach(element => {
                if (element.success) {
                    if (element.data.fixtures) {
                        matches.push(...element.data.fixtures);
                    } else if (element.data.match) {
                        matches.push(...element.data.match);
                    }
                }

            });
            return matches;
        }).catch((err) => { throw err });
}

let mapMatchesByDate = function (arr) {
    let arr1 = arr.reduce((arr1, el) => {
        let found = arr1.find((match) => {
            return match.date === el.date;
        });
        if (found) {
            found.matches.push(el);
        } else {
            let object = {};
            object['date'] = el.date;
            object['matches'] = [el];
            arr1.push(object);
        }
        return arr1;

    }, []);
    return arr1;
}

let saveMatchToDatabase = function (matches) {
    return Match.create(matches)
        .then((matches) => {
            console.log('matched saved to db');
        })
        .catch((err) => { throw err; });
}

let getMachesFromDatabase = function () {
    return Match.find({});
}

let sortByDate = function (match_a, match_b) {
    let date1 = new Date(a.date);
    let date2 = new Date(b.date);
    return date1 - date2
}

Router.get('/', (req, res) => {
    getMachesFromDatabase()
        .then((matches) => {
            let sortedMatches = mapMatchesByDate(matches).sort(sortByDate);
            res.render('matches/matches', { sortedMatches: sortedMatches });
        });
});

module.exports = Router;