'use strict';

module.exports = function corsSupport(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Expose-Headers', 'X-Auth-Token, X-Auth-DeviceId');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Auth-Token, X-Auth-DeviceId');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        return res.status(200).end();
    }

    next();
};