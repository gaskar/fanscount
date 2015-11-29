(function() {
    'use strict';

    angular
        .module('fanscount')
        .service('LeagueService', [
            '$q',
            '$http',
            'apiUrl',
            LeagueService]);

    function LeagueService($q, $http, apiUrl) {
        this.$q = $q;
        this.$http = $http;
        this.apiUrl = apiUrl;

        return this;
    }

    LeagueService.prototype.getByCountry= function (countryId) {
        var deferred = this.$q.defer();
        this.$http({
            url: this.apiUrl + '/leagues/country/' + countryId,
            method: 'GET'
        }).success(function(data) {
            deferred.resolve(data);
        }).error(function(err, status) {
            deferred.reject(err, status);
        });
        return deferred.promise;
    };
})();
