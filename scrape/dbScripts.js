'use strict';

require('../schemas/club');
require('../schemas/league');
require('../schemas/country');


let mongoose = require('mongoose-q')(require('../node_modules/mongoose')),
    Club = mongoose.model('Club'),
    League = mongoose.model('League'),
    Country = mongoose.model('Country');


mongoose.connect('mongodb://localhost/fanscount');

exports. addToDb = function(clubInfo) {
  let country;
  getCountry(clubInfo.country)
    .then(function (countryObj) {
      country = countryObj;
      return getLeague(clubInfo.league, country);
    })
    .then(function (league) {
      clubInfo.league = {
        leagueName: league.name,
        leagueId: league._id
      };

      clubInfo.country = {
        countryName: country.name,
        countryId: country._id
      };
      createdInLastWave++;

      console.log(clubInfo.teamNumber, createdInLastWave);

      Club.create(clubInfo);
    })
    .catch(function(err) {
      console.log('error on creating', teamNumber);
    });
}


var getLeague = function (leagueName, country) {
    for (let i = 0; i < leagues.length; i++) {
      if (leagues[i].name === leagueName && leagues[i].country.countryName === country.name) {
        return Q(leagues[i]);
      }
    }

    let league = new League({
      name: leagueName,
      country: {
        countryName: country.name,
        countryId: country._id
      }
    });

    return league.saveQ()
            .then(function (league) {
              leagues.push(league);

              return league;
            });
};

var getCountry = function (countryName) {
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name === countryName) {
      return Q(countries[i]);
    }
  }

  let country = new Country({
    name: countryName
  });

  return country.saveQ()
          .then(function (country) {
            countries.push(country);

            return country;
          });
};
