'use strict';

function __mergeSharedConfigs(shared, config) {
    for (var key in shared) {
        config[key] = shared[key];
    }

    return config
}

function __mongoConfig() {
    return process.env.MONGOLAB_URI !== 'undefined' && process.env.MONGOLAB_URI;
}


function __createConfig() {
    var env = process.env.NODE_ENV || 'local';

    var config = require('./config');

    config = __mergeSharedConfigs(config.shared, config[env]);

    config.env = env;

    config.db = __mongoConfig() || config.db;

    return config;
}

module.exports = __createConfig();