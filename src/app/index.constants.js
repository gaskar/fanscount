/* global malarkey:false, moment:false */
(function() {
    'use strict';

    angular
        .module('fanscount')
        .constant('malarkey', malarkey)
        .constant('moment', moment)
        .constant('lodash', _)
        .constant('apiUrl', 'http://localhost:3000/api/v1');
})();
