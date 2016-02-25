'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var Club = mongoose.model('Club');

exports.getOne = function (id) {
    return Club
        .findOne({ _id: id})
        .select('-deleted -__v')
        .deepPopulate('league.leagueId country.countryId')
        .execQ();
};

exports.getByLeague = function(league) {
    return Club
        .find({"league.leagueId": league})
        .select('-deleted -__v')
        .execQ();
};
