(function() {
    'use strict';

    angular
        .module('fanscount')
        .controller('MainController',   [
            '$scope',
            '$rootScope',
            '$state',
            'UserService',
            MainController]);

    /** @ngInject */
    function MainController($scope, $rootScope, $state, UserService) {
        this.$ = $scope;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.UserService = UserService;

        this.init();
        
        return this;
    }

    MainController.prototype.init = function () {
        var self = this;
    };

})();
