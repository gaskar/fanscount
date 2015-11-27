var userService = require('./api/v1/services/user');

exports.hasToken = function (req, res, next) {
    var token = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['x-auth-token'] || req.headers['X-Auth-Token'] || (req.body && req.body.token) || (req.query && req.query.token);
    if(!token) {
        return res.status(401).end();
    }

    var userId = jwt.decode(token);
    if(!userId) {
        return res.status(400).end();
    }

    return userService.getOne(userId)
        .then(function(user) {
            if (!user) {
                return res.status(401).end();
            }
            req.user = user;
            next();
        })
};

exports.hasUpdateAccountPermission = function (req, res, next) {
    if (req.user._id.toString() !== req.entityOwner._id.toString()) {
        return res.status(400).send({error: 'Permission denied'})
    }
    next();
};
