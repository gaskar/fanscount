(function() {
    'use strict';

    angular
        .module('fanscount')
        .service('CountryService', [
            '$q',
            '$http',
            'apiUrl',
            CountryService]);

    function CountryService($q, $http, apiUrl) {
        this.$q = $q;
        this.$http = $http;
        this.apiUrl = apiUrl;

        return this;
    }

    CountryService.prototype.getAll= function () {
        var deferred = this.$q.defer();
        this.$http({
            url: this.apiUrl + '/countries',
            method: 'GET'
        }).success(function(data) {
            deferred.resolve(data);
        }).error(function(err, status) {
            deferred.reject(err, status);
        });
        return deferred.promise;
    };
})();
