(function() {
    'use strict';

    angular
        .module('fanscount', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'toastr', 'ngStorage', 'ngTagsInput'])
        .config(['$httpProvider', function ($httpProvider) {
            //$httpProvider.interceptors.push('AuthInterceptor');
        }]);

})();
