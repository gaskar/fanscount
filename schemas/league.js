'use strict';

var mongoose = require('mongoose');

var leagueSchema = mongoose.Schema({
    name: String,
    country: {
        countryName: String,
        countryId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Country'
        }
    }
});

mongoose.model('League', leagueSchema);