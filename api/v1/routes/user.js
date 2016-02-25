'use strict';

const UserHandler = require('../handlers/user');
const user = new UserHandler(require('../services/user'));
const middleware = require('../../../middleware');

module.exports = function (app) {
    app.route('/users')
        .post(user.create.bind(user));

    app.route('/users/likes')
        .put(middleware.getClubData, user.editLikes.bind(user));

    app.route('/users/dislikes')
        .put(middleware.getClubData, user.editDisLikes.bind(user));

    app.route('users/exists')
        .get(user.isUserExists.bind(this));

    app.route('/users/:user')
        .get(user.getOne.bind(user));
};