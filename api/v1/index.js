'use strict';
/**
 * This part of the application is responsible for handling the routes api/v1. It delegates
 * the requests mounted on that path to the handlers via express-load.
 */

var path = require('path');
var fs = require('fs');
var express = require('express');
var debug = require('debug')('fanscount:api:init');
var app = module.exports = express();

var apiRoutesPath = './api/v1/routes';

function initializeRoutes() {
    var routes = fs.readdirSync(apiRoutesPath);

    for (var i = routes.length; i--;) {
        if (routes[i] === 'error.js') {
            continue;
        }

        initializeRoute(routes[i]);
    }

    initializeRoute('error.js');
}

function initializeRoute(route) {
    var routerPath = path.join(process.cwd(), apiRoutesPath, route);
    var router = require(routerPath);

    router(app);
}


debug('initializing api routes');
initializeRoutes();
