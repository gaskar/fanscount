'use strict';

const mongoose = require('mongoose-q')(require('mongoose'));
const User = mongoose.model('User');
const League = mongoose.model('League');

function UserHandler(userService) {
    this.service = userService;
}

UserHandler.prototype.isUserExists = function (req, res, next) {
    return this.service.getFacebookUser(req.body.id)
        .then(function(user) {
            user = user || null;

            if(user.clubs.length) {
                if(user.clubs.indexOf(req.body.club)) {
                    return res.status(200).send( {userExists: true, user: user} );
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

UserHandler.prototype.editLikes = function(req, res, next) {
    return this.service.getFacebookUser(req.body.id)
        .then(function(user) {
            if (!user) {
                return res.send(400);
            }

            var clubIndex = user.likes.indexOf(req.body.clubId);

            if(clubIndex !== -1) {
                user.likes.splice(clubIndex, 1);
                req.club.likesCount = req.club.likesCount - 1;
                req.club.league.leagueId.fansCount =  req.club.League.leagueId.fansCount - 1;
                req.club.country.countryId.fansCount = req.club.country.countryId.fansCount - 1;
            } else {
                user.likes.push(req.body.clubId);
                req.club.likesCount = req.club.likesCount + 1;
                req.club.league.leagueId.fansCount =  req.club.League.leagueId.fansCount + 1;
                req.club.country.countryId.fansCount = req.club.country.countryId.fansCount + 1;
            }

            return user.save();
        })
        .then(function () {
            return req.club.save()
        })
        .then(function () {
            return res.status(200).send(user);
        })
        .catch(function(err) {
            next(err)
        });
};

UserHandler.prototype.editDisLikes = function(req, res, next) {
    return this.service.getFacebookUser(req.body.id)
        .then(function(user) {
            if (!user) {
                return res.send(400);
            }

            var clubIndex = user.disLikes.indexOf(req.body.clubId);

            if(clubIndex !== -1) {
                user.disLikes.splice(clubIndex, 1);
            } else {
                user.disLikes.push(req.body.clubId);
            }

            return user.save();
        })
        .then(function() {
            return res.status(200).send(user);
        })
        .catch(function(err) {
            next(err)
        });
};

UserHandler.prototype.getOne = function(req, res, next) {
    return res.status(200).send(req.entityOwner);
};

UserHandler.prototype.create = function(req, res, next) {
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

module.exports = UserHandler;