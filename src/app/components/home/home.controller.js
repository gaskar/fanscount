(function() {
    'use strict';

    angular
        .module('fanscount')
        .controller('HomeController', [
            '$scope',
            HomeController]);

    /** @ngInject */
    function HomeController($scope) {
        this.$ = $scope;
        this.init();
        return this;
    }

    HomeController.prototype.init = function () {
        this.$.name = 'boyov & sirun';
    };

    HomeController.prototype.newMethod = function () {
        // TODO: :)
    };

})();