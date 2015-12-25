'use strict';

import $ from '../../libs/jquery-2.1.4.min.js';
import Q from '../../libs/q.js';

exports.makeCall = function(url) {
  var defer = Q.defer();

  $.ajax({
    url: url,
    success: function(result) {
      defer.resolve(result);
    },
    error: function(err) {
      defer.reject(err);
    }
  });

  return defer.promise;
};
