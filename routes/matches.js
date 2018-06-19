const express = require('express');
const fetch = require('node-fetch');
const Router = express.Router();
const Match = require('../model/matchModel');

let getMachesFromApi = function () {
    return fetch('http://worldcup.sfg.io/matches')
        .then((result) => result.json())
}

let mapMatchesByDate = function (arr) {
    let arr1 = arr.reduce((arr1, el) => {
        if (el.home_team.code === "TBD") {
            return arr1;
        }
        let found = arr1.find((match) => {
            let date1 = formatDate(el.datetime);
            return match.datetime === date1;
        });
        if (found) {
            found.matches.push(el);
            found.matches.sort(sortByDate);
        } else {
            let object = {};
            object['datetime'] = formatDate(el.datetime);
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
            return matches;
        })
        .catch((err) => { throw err; });
}

let getMachesFromDatabase = function () {
    return Match.find({})
        .then((matches) => matches)
        .catch((err) => { throw err; })
}

let sortByDate = function (match_a, match_b) {
    let date1 = new Date(match_a.datetime);
    let date2 = new Date(match_b.datetime);
    return date1 - date2;
}

let updateMatchesToDatabase = function () {
    let todaysMatches = fetch('http://worldcup.sfg.io/matches/today').then((res) => res.json());
    let updates = [];
    todaysMatches.then((matches) => {
        matches.forEach(element => {
            let promise = Match.update({ fifa_id: element.fifa_id }, element);
            updates.push(promise);
        });

        Promise.all(updates)
            .then((valuse) => {
                console.log('today\'s matched have been updated..');
            })
            .catch((err) => { throw err; })
    });
}

setInterval(updateMatchesToDatabase, 1000 * 60 * 1);

// setInterval(updateMatchesToDatabase, 1000 * 60 * 60 * 1);

let formatDate = function (datetime = new Date()) {
    let today = new Date(datetime);
    let year = today.getFullYear();
    let month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    let days = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    return `${year}-${month}-${days}`;
}

Router.get('/', (req, res) => {
    getMachesFromDatabase()
        .then((matches) => {
            let sortedMatches = mapMatchesByDate(matches).sort(sortByDate);
            let today = formatDate();
            let todayMatches = sortedMatches.find((e) => e.datetime === today);
            res.render('matches/matches', { sortedMatches: sortedMatches, todayMatches: [todayMatches] });
        });
});

Router.get('/match/:fifa_id', (req, res) => {
    Match.findOne({ fifa_id: req.params.fifa_id })
        .then((match) => {
            res.json(match);
        })
        .catch((err) => { throw err; })
});


module.exports = Router;