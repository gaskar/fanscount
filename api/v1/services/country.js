'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var Country = mongoose.model('Country');
var _ = require('lodash');

exports.getOne = function (id) {
    return Country
        .findOne({ _id: id})
        .execQ();
};

exports.getAll = function() {
    return Country
        .find()
        .execQ();
};
