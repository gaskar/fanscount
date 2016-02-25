'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var User = mongoose.model('User');
var _ = require('lodash');

exports.getOne = function (id) {
    return User
        .findOne({ _id: id, deleted: false })
        .select('-deleted -__v')
        .execQ();
};

exports.getFacebookUser = function(id) {
    return User
        .findOne({id: id, deleted: false})
        .select('-deleted -__v')
        .execQ();
};

exports.create = function (data) {
    var user = new User(data);
    return user.saveQ();
};
