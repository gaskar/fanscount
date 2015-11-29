'use strict';

var validator = require('express-validator').validator;
var _ = require('lodash');
var mongoose = require('mongoose-q')(require('mongoose'));
var Country = mongoose.model('Country');

function CountryHandler(countryService) {
    this.service = countryService;
}

CountryHandler.prototype.getAll = function(req, res, next) {
    return this.service.getAll()
        .then(function(countries) {
            console.log('conuntries', countries);
            return res.status(200).send(countries)
        })
        .catch(function(err) {
            next(err)
        })
};

module.exports = CountryHandler;