(function() {
    'use strict';

    angular
        .module('fanscount')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();
