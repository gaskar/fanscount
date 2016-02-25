'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var League = mongoose.model('League');
var _ = require('lodash');

exports.getOne = function (id) {
    return League
        .findOne({ _id: id, deleted: false })
        .select('-deleted -__v')
        .execQ();
};

exports.getByCountry = function(countryId) {
    return League
        .find({"country.countryId": countryId})
        .select('-deleted -__v')
        .execQ();
};
