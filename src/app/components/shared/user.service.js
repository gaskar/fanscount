(function() {
    'use strict';

    angular
        .module('fanscount')
        .service('UserService', [
            '$q',
            '$http',
            'apiUrl',
            UserService]);

    function UserService($q, $http, apiUrl) {
        this.$q = $q;
        this.$http = $http;
        this.apiUrl = apiUrl;
        
        return this;
    }

    UserService.prototype.signUp = function (userData) {
        var deferred = this.$q.defer();
        this.$http({
            url: this.apiUrl + '/users',
            method: 'POST',
            data: userData
        }).success(function(data) {
            deferred.resolve(data);
        }).error(function(err, status) {
            deferred.reject(err, status);
        });
        return deferred.promise;
    };

    UserService.prototype.update = function (userData) {
        console.log(userData);
        var deferred = this.$q.defer();
        this.$http({
            url: this.apiUrl + '/users/' + userData._id,
            method: 'PUT',
            data: userData
        }).success(function(data) {
            deferred.resolve(data);
        }).error(function(err, status) {
            deferred.reject(err, status);
        });
        return deferred.promise;
    };
})();
