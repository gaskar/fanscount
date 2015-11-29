(function() {
    'use strict';

    angular
        .module('fanscount')
        .controller('ClubController', [
            '$scope',
            '$state',
            '$stateParams',
            '$cookies',
            'ClubService',
            'UserService',
            ClubController]);

    /** @ngInject */
    function ClubController($scope, $state, $stateParams, $cookies, ClubService, UserService) {
        this.$ = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$cookies = $cookies;
        this.clubService = ClubService;
        this.userService = UserService;
        this.init();

        return this;
    }

    ClubController.prototype.init = function () {
        this.clubService.getByLeague(this.$stateParams.league)
            .then(function(clubs) {
                this.$.clubs = clubs;
            }.bind(this))
            .catch(function(err) {
                console.log(err); //todo change this to error handler
            })
    };

    ClubController.prototype.addFan = function(club) {
        hello('facebook').login({scope: 'email, user_friends', force: false}, function (auth) {
            hello(auth.network).api('/me').then(function (r) {
                //var self = this;
                this.$cookies.put('facebookUser', r.id);
                r.club = club;
                this.$.user = r;
                this.userService.create(self.$.user)
                    .then(function (response) {
                        // todo add some logic
                    });
            }. bind(this));
        }.bind(this))
    }
})();