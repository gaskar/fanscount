'use strict';

var ClubHandler = require('../handlers/club');
var club = new ClubHandler(require('../services/club'));
var Router = require('express').Router;

module.exports = function (app) {
    app.route('/clubs/league/:club')
        .get(club.getByLeague.bind(club));
};