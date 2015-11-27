'use strict';

var config = require('../../../config');

function ApiHandler() {
}

ApiHandler.prototype.getInfo = function(req, res, next) {
    res.status(200).send({
        version: config.apiVersion
    });
};

module.exports = ApiHandler;