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
    errClubs = [],
    leagues = [],
    countries = [],
    createdInLastWave = 0,
    teamNumber = 1,
    instances = [],
    instancesCount = 5,
    clubs = [],
    clearAfter = 10;

//let scraper = childProcess.spawn('casperjs', ['clubs.js']),
//    leagues = '';
let checkedProxiesCount = 0;

co(function*() {
    var x = 5;
    yield x;
    let proxiesTxt = yield* cogent('http://txt.proxyspy.net/proxy.txt', {string: true});

    proxiesList = proxiesTxt.text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{2,4})/g);

    let proxiesBody = yield* cogent('https://free-proxy-list.net/', {string: true});

    let dirtyProxiesList = proxiesBody.text.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?:<\/td><td>)(\d{2,4})/g);

    for(let i = 0; i < dirtyProxiesList.length; i++) {
        dirtyProxiesList[i] = dirtyProxiesList[i].replace('</td><td>', ':');
    }
    proxiesList = proxiesList.concat(dirtyProxiesList);

    proxiesList = proxiesList.slice(0, 10);
    for (let i = 0; i < proxiesList.length; i++) {
        testProxy(proxiesList[i]);
    }
});


let findAvailableProxy = function () {
    let availableProxies = _.filter(approvedProxies, function (proxyObj) {
        return !proxyObj.inProgress;
    });

    let randomElementNumber = Math.floor(Math.random() * availableProxies.length);

    return availableProxies[randomElementNumber];
};


var testProxy = function (proxy) {
    request({
        'url': 'http://whoscored.com/Teams/1',
        'proxy': 'http://' + proxy,
        'timeout': 5000
    }, function (error, response) {
        checkedProxiesCount++;

        if (!error && response.statusCode == 200) {
            approvedProxies.push({
                proxy: proxy,
                instances: 0
            });
            console.log(proxy, approvedProxies.length);
        } else {
            //console.log(error);
        }

        if (checkedProxiesCount >= proxiesList.length) {
            checkedProxiesCount = 0;
            runInstances();
        }
    }).setMaxListeners(0);
};

let createScrapeInstance = function (teamNumber, proxyObj) {
    let availableProxy = findAvailableProxy();
    let scraper = childProcess.spawn('node', ['clubs.js', teamNumber, proxyObj.proxy]);
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

let createNewInstance = function(teamNumber, proxyObj) {
  return createScrapeInstance(teamNumber++, proxyObj)
    .then(function(clubInfo) {
      console.log(clubInfo);
      clubs.push(clubInfo);
      proxyObj.inProgress = 0;
    })
    .catch(function(err) {
      console.log('err', err);
      clubsSkippedWriteStream.write(err.teamNumber + ', ');
    });
}

let runInstances = function () {
    let instancesCount = approvedProxies.length ? Math.floor(approvedProxies.length / 2) : instancesCount;

    while(instancesCount--) {
      // instances.push(checkAndCreateNewInstance(teamNumber++));
      let proxyObj = findAvailableProxy();
      createNewInstance(teamNumber++, proxyObj)
        .then(function() {
          if(clubs.length >= clearAfter) {
            console.log(clubs);
            clubs = [];
            testProxy();
          } else {
            proxyObj = findAvailableProxy();
            createNewInstance(teamNumber++, proxyObj);
          }
        })
    }
};
