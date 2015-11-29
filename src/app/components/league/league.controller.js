(function() {
    'use strict';

    angular
        .module('fanscount')
        .controller('LeagueController', [
            '$scope',
            '$state',
            '$stateParams',
            'LeagueService',
            LeagueController]);

    /** @ngInject */
    function LeagueController($scope, $state, $stateParams, LeagueService) {
        this.$ = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.leagueService = LeagueService;
        this.init();

        return this;
    }

    LeagueController.prototype.init = function () {
        this.leagueService.getByCountry(this.$stateParams.country)
            .then(function(leagues) {
                this.$.leagues = leagues;
            }.bind(this))
            .catch(function(err) {
                console.log(err); //todo change this to error handler
            })
    };

    LeagueController.prototype.goToClubs = function(league) {
        this.$state.go('clubs.league', {league: league})
    }
})();