'use strict';

const mongoose = require('mongoose-q')(require('mongoose'));
const Country = mongoose.model('Country');

function CountryHandler (countryService) {
    this.service = countryService;
}

CountryHandler.prototype.getAll = function(req, res, next) {
    return this.service.getAll()
        .then(function(countries) {
            return res.status(200).send(countries)
        })
        .catch(function(err) {
            next(err)
        })
};

module.exports = CountryHandler;