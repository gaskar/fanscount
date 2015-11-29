'use strict';

require('../models/club');
require('../models/league');
require('../models/country');

let childProcess = require('child_process'),
    _ = require('lodash'),
    co = require('co'),
    cogent = require('cogent'),
    request = require('request'),

    mongoose = require('mongoose'),
    Club = mongoose.model('Club'),
    League = mongoose.model('League'),
    Country = mongoose.model('Country');


mongoose.connect('mongodb://localhost/fanscount');

let proxiesList = [],
    approvedProxies = [],
    skippedClubs = [],
    instancesCount = 20;

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

    for(let i = 0; i < proxiesList.length; i++) {
        testProxy(proxiesList[i]);
    }

    console.log(proxiesList);
});



var runInstances = function() {
    instancesCount = Math.floor(approvedProxies.length / 2);
    for(var i = 1; i < instancesCount; i++) {
        createScrapeInstance(i);
    }
};


var testProxy = function(proxy) {
    request({
        'url':'http://whoscored.com/Teams/1',
        'proxy': 'http://' + proxy,
        'timeout': 5000
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

        if(checkedProxiesCount >= proxiesList.length) {
            runInstances();
        }
    });
};

let findAvailableProxy = function() {
    let availableProxies = _.filter(approvedProxies, function(proxyObj) {
        return !proxyObj.inProgress;
    });

    let randomElementNumber = Math.floor(Math.random() * availableProxies.length);

    return availableProxies[randomElementNumber];
};

let createScrapeInstance = function(start) {
    let availableProxy = findAvailableProxy();

    let scraper = childProcess.spawn('node', ['clubs.js', start, availableProxy.proxy]);

    scraper.stdout.on('data', function(stdout) {
        var clubInfo = JSON.parse(stdout);

        if(!clubInfo.name) {
            skippedClubs.push(start);
            console.log(skippedClubs);
        }

        console.log(start);
        Club.create(clubInfo);

    });

    scraper.on('exit', function() {
        availableProxy.inProgress = 0;
        createScrapeInstance(instancesCount++);
    });
};


