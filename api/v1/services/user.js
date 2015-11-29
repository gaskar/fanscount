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

exports.update = function (user, data) {
    return interestService.processInterests(data.interests)
        .then(function (interestsToAdd) {
            user = _.assign(user, data);
            user.interests = interestsToAdd;
            return user.saveQ();
        });
};

exports.login = function(email, password) {
    return User
        .findOne({email: email, hashedPassword: password, deleted: false })
        .select('-deleted -__v')
        .execQ();
};

exports.getUserByProvider = function(provider, id) {
    var query = {};
    query[provider + '.id'] = id;

    return User.findOneQ(query);
};

exports.checkUserExistence = function (email) {
    return User
        .findOne({ email: email })
        .select('-deleted -__v')
        .execQ();
};

exports.mergeUserData = function(user, newData) {
    delete newData.fullName;
    return _.merge(user, newData);
};