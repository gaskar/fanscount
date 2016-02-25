const clubService = require('./api/v1/services/club');
const leagueService = require('./api/v1/services/league');

exports.getClubData = function (req, res, next) {
    clubService.getOne(req.params.club)
        .then(function(club) {
            req.club = club;
            next();
        })
        .catch(next)
};
