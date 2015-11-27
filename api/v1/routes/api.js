'use strict';

var ApiHandler = require('../handlers/api');
var api = new ApiHandler();

module.exports = function (app) {
    app.get('/', api.getInfo);
};