'use strict';

var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
    name: String,
    flag: String,

    deleted: {
        type: Boolean,
        default: false
    },

    updated: {
        type: Date,
        default: Date.now
    },

    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Country', countrySchema);