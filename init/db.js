'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var debug = require('debug')('fanscount:init:db');


var dbInitialized = false;

exports.init = function (config, forceNoDebug) {
    //Preventing the module to be initialize more than one time
    if (dbInitialized) {
        return;
    }

    dbInitialized = true;

    //Connecting to the database
    debug('initializing database connection');
    mongoose.connect(config.db);

    //Set debug mode for dev environment
    var env = process.env.NODE_ENV || 'dev';
    if (env === 'dev' && !forceNoDebug) {
        mongoose.set('debug', true);
    }

    //Init model schemas
    debug('initializing model schemas');
    var schemasPath = process.cwd() + '/schemas';
    var schemaFiles = fs.readdirSync(schemasPath);

    schemaFiles.forEach(function (file) {
        require(schemasPath + '/' + file);
        debug('model schema initialized: %s', file);
    });
};