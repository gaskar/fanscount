'use strict';

import request from '../helpers/request.js';

exports.getAll = function() {
  return request.makeCall('/api/v1/countries')
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      console.error(err);
    });
};
