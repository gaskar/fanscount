(function() {
    'use strict';

    angular
        .module('fanscount')
        .service('ClubService', [
            '$q',
            '$http',
            'apiUrl',
            ClubService]);

    function ClubService($q, $http, apiUrl) {
        this.$q = $q;
        this.$http = $http;
        this.apiUrl = apiUrl;

        return this;
    }

    ClubService.prototype.getByLeague = function (leagueId) {
        var deferred = this.$q.defer();
        this.$http({
            url: this.apiUrl + '/clubs/league/' + leagueId,
            method: 'GET'
        }).success(function(data) {
            deferred.resolve(data);
        }).error(function(err, status) {
            deferred.reject(err, status);
        });
        return deferred.promise;
    };
})();
