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
            })
            .state('leagues', {
                url: '/leagues',
                abstract: true,
                template: "<div ui-view></div>"
            })
            .state('leagues.country', {
                url: '/country/:country',
                templateUrl: 'app/components/league/league.html',
                controller: 'LeagueController as leagueCtrl'
            })
            .state('clubs', {
                url: '/clubs',
                abstract: true,
                template: "<div ui-view></div>"
            })
            .state('clubs.league', {
                url: '/club/:league',
                templateUrl: 'app/components/club/club.html',
                controller: 'ClubController as clubCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})();
