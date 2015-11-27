'use strict';
var util = require('util');

function ErrorHandler() {

}

ErrorHandler.prototype.logErrors = function (err, req, res, next) {
    console.error(err.stack || err.toString());

    next(err);
};

ErrorHandler.prototype.errorHandler = function (err, req, res, next) {
    res.status(err.status || 500);

    res.send(err);
};


module.exports = ErrorHandler;