'use strict';

var mongoose = require('mongoose');

var leagueSchema = mongoose.Schema({

    name: {
        type: String,
        index: true
    },

    country: {
        countryName: {
            type: String
        },
        countryId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Country'
        }
    },

    fansCount: {
        type: Number,
        index: true
    },

    logo: {
        type: String
    },

    created: {
        type: Date,
        default: Date.now()
    },

    updated: {
        type: Date,
        default: Date.now()
    },
    
    deleted: {
        type: Boolean,
        deleted: false,
        sparse: true
    }
});

mongoose.model('League', leagueSchema);