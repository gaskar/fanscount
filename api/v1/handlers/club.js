'use strict';

var validator = require('express-validator').validator;
var _ = require('lodash');
var mongoose = require('mongoose-q')(require('mongoose'));
var Club = mongoose.model('Club');

function ClubHandler(clubService) {
    this.service = clubService;
}

ClubHandler.prototype.getByLeague = function(req, res, next) {
    return this.service.getByLeague(req.params.club)
        .then(function(clubs) {
            return res.status(200).send(clubs)
        })
        .catch(function(err) {
            next(err)
        })
};

module.exports = ClubHandler;