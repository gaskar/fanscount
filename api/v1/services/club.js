'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var Club = mongoose.model('Club');
var _ = require('lodash');

exports.getOne = function (id) {
    return Club
        .findOne({ _id: id})
        .execQ();
};

exports.getByLeague = function(league) {
    console.log('league', league)
    return Club
        .find({"league.leagueId": league})
        .execQ();
};
