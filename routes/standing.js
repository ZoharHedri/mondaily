const express = require('express');
const fetch = require('node-fetch');
const Router = express.Router();
const Standing = require('../model/standingModel');
// 'key=kcmtap0Gn7LZGMpW&secret=5rTFYHfPq3f6mVpH8MaibbZziKyZxYWD'

let getStandingFromApi = function () {
    let group_a = fetch('http://livescore-api.com/api-client/leagues/table.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=793').then((result) => result.json());
    let group_b = fetch('http://livescore-api.com/api-client/leagues/table.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=794').then((result) => result.json());;
    let group_c = fetch('http://livescore-api.com/api-client/leagues/table.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=795').then((result) => result.json());;
    let group_d = fetch('http://livescore-api.com/api-client/leagues/table.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=796').then((result) => result.json());;
    let group_e = fetch('http://livescore-api.com/api-client/leagues/table.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=797').then((result) => result.json());;
    let group_f = fetch('http://livescore-api.com/api-client/leagues/table.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=798').then((result) => result.json());;
    let group_g = fetch('http://livescore-api.com/api-client/leagues/table.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=799').then((result) => result.json());;
    let group_h = fetch('http://livescore-api.com/api-client/leagues/table.json?key=aJhG61h0KLk0Ty2G&secret=vtihJ4Metz2v8X3jGkZNlgN6177VGaCb&league=800').then((result) => result.json());;


    let standing = [];
    return Promise.all([group_a, group_b, group_c, group_d, group_e, group_f, group_g, group_h])
        .then((values) => {
            values.forEach(element => {
                let teams = [];
                teams.push(...element.data.table);
                let group = {
                    league_id: element.data.table[0].league_id,
                    teams: teams
                }
                standing.push(group);
            });
            return standing;
            // res.render('standing/standing', { tables: standing });
        }).catch((err) => { throw err });
}

let saveStandingToDatabase = function (dataFromApi) {
    return Standing.create(dataFromApi)
        .then((standingDocs) => {
            console.log('standing saved successfully.');
            return standingDocs;
        })
        .catch((err) => { throw err });
}

let getStandingFromDatabase = function () {
    return Standing.find({});
}

let updateStandingToDatabase = function (data) {
    let updates = [];
    data.forEach(group => {
        let promise = Standing.update({ league_id: group.league_id }, { $set: { teams: group.teams } });
        updates.push(promise);
    });
    return Promise.all(updates)
        .then((results) => {
            console.log('standing has been updated...');
            return results;
        })
        .catch((err) => { throw err; });
}

Router.get('/', (req, res) => {
    getStandingFromDatabase().then((data) => res.render('standing/standing', { tables: data, title: 'World Cup Standing' }));
});

let updateStanding = () => {
    getStandingFromApi().then((data) => {
        updateStandingToDatabase(data);
    });
}

setInterval(updateStanding, 1000 * 60 * 60 * 1);

module.exports = Router;