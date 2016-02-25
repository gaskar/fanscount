'use strict';

var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({

    name: {
        type: String,
        index: true
    },

    flag: {
        type: String,
        index: true
    },

    fansCount: {
        type: Number,
        index: true
    },

    created: {
        type: Date,
        default: Date.now
    },

    updated: {
        type: Date,
        default: Date.now
    },

    deleted: {
        type: Boolean,
        default: false,
        sparse: true
    }
});

mongoose.model('Country', countrySchema);