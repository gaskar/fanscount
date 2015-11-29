(function() {
    'use strict';

    angular
        .module('fanscount')
        .controller('HomeController', [
            '$scope',
            '$state',
            'CountryService',
            HomeController]);

    /** @ngInject */
    function HomeController($scope, $state, CountryService) {
        this.$ = $scope;
        this.$state = $state;
        this.countryService = CountryService;
        this.init();

        return this;
    }

    HomeController.prototype.init = function () {
        this.$.name = 'boyov & sirun';
        this.countryService.getAll()
            .then(function(countries) {
                this.$.countries = countries;
                console.log(this.$.countries);

                console.log(countries)
            }.bind(this))
            .catch(function(err) {
                console.log(err); //todo change this to error handler
            })
    };

    HomeController.prototype.goToLeagues = function(country) {
        this.$state.go('leagues.country', {country: country})
    }
})();