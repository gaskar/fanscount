'use strict';

var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
    name: String,
    flag: String
});

mongoose.model('Country', countrySchema);