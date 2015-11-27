(function() {
    'use strict';

    angular
        .module('fanscount')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/home.html',
                controller: 'HomeController as homeCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})();
