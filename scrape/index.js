'use strict';

require('../schemas/club');
require('../schemas/league');
require('../schemas/country');

let childProcess = require('child_process'),
    _ = require('lodash'),
    co = require('co'),
    cogent = require('cogent'),
    request = require('request'),
    fs = require('fs'),
    Q = require('Q'),

    mongoose = require('mongoose-q')(require('../node_modules/mongoose')),
    Club = mongoose.model('Club'),
    League = mongoose.model('League'),
    Country = mongoose.model('Country');


mongoose.connect('mongodb://localhost/fanscount');

let clubsSkippedWriteStream = fs.createWriteStream('skippedClubs.txt');

let proxiesList = [],
    approvedProxies = [],
    skippedClubs = [],
    errClubs = [],
    leagues = [],
    countries = [],
    instancesCount = 50;

//let scraper = childProcess.spawn('casperjs', ['clubs.js']),
//    leagues = '';
let checkedProxiesCount = 0;

co(function*() {
    let proxiesTxt = yield* cogent('http://txt.proxyspy.net/proxy.txt', {string: true});

    proxiesList = proxiesTxt.text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,4})/g);

    let proxiesBody = yield* cogent('https://free-proxy-list.net/', {string: true});

    let dirtyProxiesList = proxiesBody.text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?:<\/td><td>)(\d{2,4})/g);

    for(let i = 0; i < dirtyProxiesList.length; i++) {
        dirtyProxiesList[i] = dirtyProxiesList[i].replace('</td><td>', ':');
    }
    proxiesList = proxiesList.concat(dirtyProxiesList);

    for (let i = 0; i < proxiesList.length; i++) {
        testProxy(proxiesList[i]);
    }
    runInstances();
});

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
    //console.log(countries[0], country[0] ? countries[0].name : );
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

var runInstances = function () {
    instancesCount = approvedProxies.length ? Math.floor(approvedProxies.length / 2) : instancesCount;
    for (var i = 1; i < instancesCount; i++) {
        createScrapeInstance(i);
    }
};


var testProxy = function (proxy) {
    request({
        'url': 'http://whoscored.com/Teams/1',
        'proxy': 'http://' + proxy,
        'timeout': 3000
    }, function (error, response) {
        checkedProxiesCount++;

        if (!error && response.statusCode == 200) {
            approvedProxies.push({
                proxy: proxy,
                inProgress: 0
            });
            console.log(proxy, approvedProxies.length);
        } else {
            //console.log(error);
        }

        if (checkedProxiesCount >= proxiesList.length) {
            runInstances();
        }
    });
};

let findAvailableProxy = function () {
    let availableProxies = _.filter(approvedProxies, function (proxyObj) {
        return !proxyObj.inProgress;
    });

    let randomElementNumber = Math.floor(Math.random() * availableProxies.length);

    return availableProxies[randomElementNumber];
};

let createScrapeInstance = function (start) {
    let availableProxy = findAvailableProxy();

    let scraper = childProcess.spawn('node', ['clubs.js', start, availableProxy.proxy]);

    scraper.stdout.on('data', function (stdout) {
        var clubInfo = JSON.parse(stdout);

        if (clubInfo.errCode === 404) {
            errClubs.push(clubInfo.teamNumber);
            clubsSkippedWriteStream.write(clubInfo.teamNumber + ', ');
        } else if (!clubInfo.name) {
            console.log(clubInfo);
            skippedClubs.push(start);
            clubsSkippedWriteStream.write(clubInfo.teamNumber + ', ');
        } else {
            let country;
            console.log(clubInfo.country);
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

                    console.log(clubInfo.teamNumber);

                    Club.create(clubInfo);
                });
        }
    });


    scraper.on('exit', function () {
        availableProxy.inProgress = 0;
        createScrapeInstance(instancesCount++);
    });
};


