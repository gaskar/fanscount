'use strict';

var validator = require('express-validator').validator;
var _ = require('lodash');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = mongoose.model('User');

function UserHandler(userService) {
    this.service = userService;
}

UserHandler.prototype.isUserExists = function(req, res, next) {
    return this.service.getFacebookUser(req.body.id)
        .then(function(user) {
            user = user || null;

            if(user.clubs.length) {
                if(user.clubs.indexOf(req.body.club)) {
                    return res.status(200).send({userExists: true, user: user});
                } else {
                    return res.send({userExists: false, user: user})
                }
            } else {
                return res.send({userExists: false, user: user})
            }
        })
        .catch(function(err) {
            next(err)
        })
};

UserHandler.prototype.edit = function(req, res, next) {
    req.assert('subscriber.name', 'required').notEmpty().len(1, 50);
    req.assert('subscriber.name', 'required').notEmpty().len(1, 50);
    req.assert('subscriber.email', 'Invalid format').notEmpty().isEmail().len(1, 100);

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send({error: 'validation', details: errors});
        return;
    }

    return this.service.getFacebookUser(req.body.id)
        .then(function(user) {
            if (!user) {
                return res.send(400);
            }

            var clubIndex = user.clubs.indexOf(req.body.clubId);

            if(clubIndex !== -1) {
                user.clubs.splice(clubIndex, 1)
            } else {
                user.clubs.push(req.body.clubId);
            }

            return user.save()
                .then(function(updatedUser) {
                    return res.status(200).send(updatedUser);
                })
                .catch(function(err) {
                    next(err);
                })    ;

        })
        .catch(function(err) {
            next(err)
        });
};

UserHandler.prototype.getOne = function(req, res, next) {
    return res.status(200).send(req.entityOwner);
};

UserHandler.prototype.create = function(req, res, next) {
        //req.assert('name','required').notEmpty().len(1, 60);
        //req.assert('email','required').notEmpty().len(1, 50);
        //req.assert('id','required').notEmpty().len(1, 50);

        //var errors = req.validationErrors();
        //if (errors) {
        //    res.send({validation: errors}, 400);
        //    return;
        //}

        var user = new User(req.body.user);
        user.clubs.push(req.body.club);
        return user.saveQ()
            .then(function(user) {
                res.status(201).send(user)
            })
            .catch(function(err) {
                next(err)
            })
};

UserHandler.prototype.param = function (req, res, next, id) {
    if (!validator.isMongoId(id)) {
        return res.status(400).end();
    }

    return this.service.getOne(id)
        .then(function (user) {
            if (!user) {
                return res.status(404).end();
            }

            req.entityOwner = user;

            next();
        })
        .catch(next);
};

module.exports = UserHandler;