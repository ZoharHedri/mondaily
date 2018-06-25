const express = require('express');
const fetch = require('node-fetch');
const Router = express.Router();
const Standing = require('../model/standingModel');
// 'key=kcmtap0Gn7LZGMpW&secret=5rTFYHfPq3f6mVpH8MaibbZziKyZxYWD'

let getStandingFromApi = function () {
    return fetch('http://worldcup.sfg.io/teams/results').then((res) => res.json());
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
    data.forEach(teamStand => {
        let promise = Standing.update({ id: teamStand.id }, teamStand);
        updates.push(promise);
    });
    return Promise.all(updates)
        .then((results) => {
            console.log('standing has been updated...');
            return results;
        })
        .catch((err) => { throw err; });
}


let mapStandingByGroupLetter = function (data) {
    let standing = [];
    data.forEach(element => {
        let found = standing.find((standTeam) => standTeam.group_letter === element.group_letter);
        if (found) {
            found.teams.push(element);
        } else {
            let teams = [element];
            let group = {
                group_letter: element.group_letter,
                teams: teams
            }
            standing.push(group);
        }
    });
    return standing;
}

let sortByGroupLetter = function (a, b) {
    return a.group_letter > b.group_letter;
}

let sortByPoints = function (element) {
    element.teams.sort((a, b) => b.points - a.points || b.goal_differential - a.goal_differential || b.goals_for - a.goals_for || b.goals_against - a.goals_against);
    for (let i = 0; i < element.teams.length; i++) {
        element.teams[i].rank = i + 1;
    }
}
Router.get('/', (req, res) => {
    getStandingFromDatabase().then((data) => {
        let tables = mapStandingByGroupLetter(data).sort(sortByGroupLetter);
        tables.forEach(sortByPoints);
        res.render('standing/standing', { title: 'Standing', tables: tables, title: 'World Cup Standing' })
    });
});



let updateStanding = () => {
    getStandingFromApi().then((data) => {
        updateStandingToDatabase(data);
    });
}

setInterval(updateStanding, 1000 * 60 * 1 * 10);

module.exports = Router;