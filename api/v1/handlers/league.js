'use strict';

const mongoose = require('mongoose-q')(require('mongoose'));
const League = mongoose.model('League');

function LeagueHandler (leagueService) {
    this.service = leagueService;
}

LeagueHandler.prototype.getLeaguesByCountry = function(req, res, next) {
    return this.service.getByCountry(req.params.country)
        .then(function(countryLeagues) {
            return res.status(200).send(countryLeagues)
        })
        .catch(function(err) {
            next(err)
        })
};

module.exports = LeagueHandler;