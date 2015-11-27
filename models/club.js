'use strict';

var mongoose = require('mongoose');

var clubSchema = mongoose.Schema({
    name: String,
    logo: String,
    league: {
        leagueName: String,
        leagueId: {
            type: mongoose.Schema.ObjectId,
            ref: 'League'
        }
    },
    country: {
        countryName: String,
        countryId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Country'
        }
    }
});

mongoose.model('Club', clubSchema);