'use strict';

let childProcess = require('child_process'),
    _ = require('lodash'),
    co = require('co'),
    cogent = require('cogent'),
    request = require('request'),
    fs = require('fs'),
    dbScripts = require('./dbScripts'),
    Q = require('Q');

let clubsSkippedWriteStream = fs.createWriteStream('skippedClubs.txt');

let proxiesList = [],
    approvedProxies = [],
    skippedClubs = [],
    teamNumber = 1,
    instancesCount = 5,
    clubs = [],
    clearAfter = 10,
    testPromises = [];

let checkedProxiesCount = 0;

co(function*() {
    let proxiesTxt = yield* cogent('http://txt.proxyspy.net/proxy.txt', {string: true});

    proxiesList = proxiesTxt.text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,4})/g);

    let proxiesBody = yield* cogent('https://free-proxy-list.net/', {string: true});
    let dirtyProxiesList = proxiesBody.text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?:<\/td><td>)(\d{2,4})/g);

    for (let i = 0; i < dirtyProxiesList.length; i++) {
        dirtyProxiesList[i] = dirtyProxiesList[i].replace('</td><td>', ':');
    }
    proxiesList = proxiesList.concat(dirtyProxiesList);

    //proxiesList = proxiesList.slice(0, 10);
    for (let i = 0; i < proxiesList.length; i++) {
        testPromises.push(testProxy(proxiesList[i]));
    }

    Q.all(testPromises)
        .then(function(results) {
            return results.filter(function(el) {
                return Object.keys(el).length;
            });
        })
        .then(function(approvedProxies) {
            runInstances(approvedProxies);
        })
        .catch(function(err) {
            console.log(err);
        });

});


let findAvailableProxy = function (approvedProxies) {
    let availableProxies = _.filter(approvedProxies, function (proxyObj) {
        return !proxyObj.instances;
    });

    let randomElementNumber = Math.floor(Math.random() * availableProxies.length);

    return availableProxies[randomElementNumber];
};


var testProxy = function (proxy) {
    var defer = Q.defer();
    request({
        'url': 'http://whoscored.com/Teams/1',
        'proxy': 'http://' + proxy,
        'timeout': 5000
    }, function (error, response) {
        checkedProxiesCount++;

        if (!error && response.statusCode == 200) {
            defer.resolve({
                proxy: proxy,
                instances: 0
            });

        } else {
            defer.resolve({});
        }
    }).setMaxListeners(0);

    return defer.promise;
};

let createScrapeInstance = function (teamNumber, proxy) {
    let scraper = childProcess.spawn('node', ['clubs.js', teamNumber, proxy]);
    let defer = Q.defer();
    let clubInfo = null;

    scraper.stdout.on('data', function (stdout) {
        clubInfo = JSON.parse(stdout);
    });

    scraper.on('exit', function () {
        if (clubInfo.errCode === 404 || !clubInfo.name) {
            defer.reject(clubInfo);
        } else {
            defer.resolve(clubInfo);
        }
    });

    return defer.promise;
};

let createNewInstance = function (teamNumber, proxyObj) {
    return createScrapeInstance(teamNumber++, proxyObj)
        .then(function (clubInfo) {
            console.log(clubInfo);
            proxyObj.inProgress = 0;
        })
        .catch(function (err) {
            console.log('err', err);
            clubsSkippedWriteStream.write(err.teamNumber + ', ');
        });
};

let runInstances = function (approvedProxies) {
    let instancesCount = Math.floor(approvedProxies.length / 2);

    let teamNumber = 1;

    while (instancesCount--) {

        (function() {
            let proxyObj = findAvailableProxy();

            createScrapeInstance(teamNumber++, proxyObj.proxy)
                .then(function(clubInfo) {
                    console.log(clubInfo);
                    createScrapeInstance(teamNumber++, )
                });
        })();

    }
};
