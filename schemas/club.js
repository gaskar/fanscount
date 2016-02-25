'use strict';

const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const clubSchema = mongoose.Schema({

    name: {
        type: String,
        index: true
    },

    logo: {
        type: String,
        index: true
    },

    teamNumber: {
        type: String
    },

    league: {
        leagueName: {
            type: String
        },

        leagueId: {
            type: mongoose.Schema.ObjectId,
            ref: 'League'
        }
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

    likesCount: {
        type: Number,
        index: true
    },

    disLikesCount: {
        type: Number,
        index: true
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
        default: false
    }
});

clubSchema.plugin(deepPopulate);

mongoose.model('Club', clubSchema);