'use strict';

var UserHandler = require('../handlers/user');
var user = new UserHandler(require('../services/user'));
var Router = require('express').Router;
var auth = require('../../../auth');

module.exports = function (app) {
    app.route('/users')
        .post(user.create.bind(user))
        .put(user.edit.bind(user));

    app.route('users/exists')
        .get(user.isUserExists.bind(this));

    app.route('/users/:user')
        .get(user.getOne.bind(user));

    app.param('user', user.param.bind(user));
};