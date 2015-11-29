(function() {
    'use strict';

    angular
        .module('fanscount')
        .controller('MainController',   [
            '$scope',
            '$rootScope',
            '$cookies',
            '$state',
            'UserService',
            MainController]);

    /** @ngInject */
    function MainController($scope, $rootScope, $cookies, $state, UserService) {
        this.$ = $scope;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$cookies = $cookies;
        this.UserService = UserService;

        this.init();
        
        return this;
    }

    MainController.prototype.init = function () {
        hello.init({
            facebook: 1088318051212928 //local
        });

        //var userId = $cookies.get('facebookUser');
        //
        //if(userId) {
        //    Subscribers.getFacebookUser({id: subscriberId}, function(response) {
        //        $scope.facebookUser = response.subscriber;
        //    });
        //}
        var self = this;
    };

})();
