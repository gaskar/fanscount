'use strict';

var fs = require('fs');
var path = require('path');
var debug = require('debug')('fanscount:init');

module.exports = function (config) {
    var initPath = __dirname;
    var init = fs.readdirSync(initPath);
    init.forEach(function (js) {
        if (js === 'index.js') {
            return;
        }

        debug('initializing ' + js);

        require(path.join(initPath, js)).init(config, true);
    });
};

