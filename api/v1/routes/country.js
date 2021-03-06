'use strict';

var CountryHandler = require('../handlers/country');
var country = new CountryHandler(require('../services/country'));
var Router = require('express').Router;

module.exports = function (app) {
    app.route('/countries')
        .get(country.getAll.bind(country));
};