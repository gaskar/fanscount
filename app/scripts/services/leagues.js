'use strict';

import request from '../helpers/request.js';

exports.getByCountry = function (countryId) {
    return request.makeCall('/api/v1/leagues/country/' + countryId)
        .then(function (data) {
            return data;
        })
        .catch(function (err) {
            console.error(err);
        });
};
