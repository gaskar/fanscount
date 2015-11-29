'use strict';

var LeagueHandler = require('../handlers/league');
var league = new LeagueHandler(require('../services/league'));
var Router = require('express').Router;
var auth = require('../../../auth');

module.exports = function (app) {
    app.route('/leagues/country/:country')
        .get(league.getLeaguesByCountry.bind(league));
};